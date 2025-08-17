"""
模組名稱：TicketModule.py
功能說明：
    - 取得指定活動的票務資料
    - 檢查使用者是否已購票
    - 保留原本 JOIN、TOTP 驗證、前端反灰座位的邏輯
    - 強化：
        1. Redis 高併發座位鎖
        2. ThreadTools 非阻塞 SQL 查詢
        3. 完整錯誤捕捉與資源釋放
    - 不 import 工具模組，僅依賴 main.py 傳入的工具實例
"""

# 取得票務資料（保留原強化版）
async def GetTicketData(request, reqT, sqlT, totpT, redisT, threadT):
    try:
        response = await reqT.GetJson(request=request)
        if not response or "data" not in response:
            return {"status": False, "notify": "請求格式錯誤", "tickets": []}

        data = response["data"]
        event_id = data.get("event_id")
        secret = data.get("secret")
        otp_code = data.get("otp")

        if not all([event_id, secret, otp_code]):
            return {"status": False, "notify": "缺少必要資料", "tickets": []}

        if not totpT.verifyCode(secret, otp_code):
            return {"status": False, "notify": "驗證碼錯誤", "tickets": []}

        lock_key = f"lock:event:{event_id}"
        if not redisT.acquireLock(lock_key, timeout=3):
            return {"status": False, "notify": "系統繁忙，請稍後再試", "tickets": []}

        try:
            SQL = """
                SELECT ticket.id, ticket.seat, ticket.status, register.name
                FROM ticket
                INNER JOIN register ON register.id = ticket.register_id
                INNER JOIN `event` ON `event`.id = ticket.event_id
                WHERE ticket.event_id = %s
            """
            result = await threadT.runAsync(sqlT.execute, SQL, True, (event_id,))

            return {
                "status": True,
                "notify": "成功取得票務資料",
                "tickets": result
            }

        finally:
            redisT.releaseLock(lock_key)

    except Exception as e:
        return {
            "status": False,
            "notify": f"取得票務資料失敗 : {type(e)} | {e}",
            "tickets": []
        }

# 🔹 檢查使用者是否已購票（保留原本邏輯）
async def CheckTicketPurchased(request, reqT, sqlT):
    """
    功能：
        - 檢查指定使用者是否已購票
        - 前端用於座位反灰或購票限制
    回傳：
        {
            "status": True/False,
            "notify": str,
            "purchased": list
        }
    """
    try:
        response = await reqT.GetJson(request=request)
        if not response or "data" not in response:
            return {"status": False, "notify": "請求格式錯誤", "purchased": []}

        data = response["data"]
        event_id = data.get("event_id")
        user_id = data.get("user_id")

        if not all([event_id, user_id]):
            return {"status": False, "notify": "缺少必要資料", "purchased": []}

        # 查詢已購票資料
        SQL = """
            SELECT ticket.id, ticket.seat
            FROM ticket
            INNER JOIN register ON register.id = ticket.register_id
            WHERE ticket.event_id = %s AND register.login_id = %s
        """
        result = sqlT.execute(SQL, SELECT=True, SET=(event_id, user_id))

        return {
            "status": True,
            "notify": "查詢完成",
            "purchased": result
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"查詢已購票資料失敗 : {type(e)} | {e}",
            "purchased": []
        }
