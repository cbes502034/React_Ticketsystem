"""
模組名稱：LoginModule.py
功能說明：
    - 使用者登入驗證（純 JWT 無狀態）
    - 不再寫入 session
    - 不 import 工具模組，僅依賴 main.py 傳入的工具實例
"""

async def Check(request, reqT, sqlT, jwtT, redisT):
    """
    功能：
        - 驗證帳號密碼
        - 登入成功返回使用者資料與 JWT Token
    回傳：
        {
            "status": True/False,
            "notify": "登入成功 / 登入失敗",
            "UserID": str,
            "UserName": str,
            "RegisterID": int,
            "token": str (JWT)
        }
    """
    # 1️⃣ 解析請求
    response = await reqT.GetJson(request=request)
    if not response or "status" not in response:
        return {"status": False, "notify": "請求格式錯誤"}

    if not response["status"]:
        return response

    try:
        # 2️⃣ 提取帳密
        data = response["data"]
        login_idInput = data.get("login_id")
        passwordInput = data.get("password")

        if not login_idInput or not passwordInput:
            return {"status": False, "notify": "缺少帳號或密碼"}

        # 3️⃣ 驗證帳密
        userData = sqlT.execute(
            """SELECT login_id,password FROM register
               WHERE login_id=%s AND password=%s""",
            SELECT=True,
            SET=(login_idInput, passwordInput)
        )

        if not userData:
            return {"status": False, "notify": "登入失敗 !"}

        # 4️⃣ 取得使用者資料
        name = sqlT.execute(
            """SELECT name FROM register 
               WHERE login_id=%s AND password=%s""",
            SELECT=True,
            SET=(login_idInput, passwordInput)
        )[0][0]

        ID = sqlT.execute(
            """SELECT id FROM register 
               WHERE login_id=%s AND password=%s""",
            SELECT=True,
            SET=(login_idInput, passwordInput)
        )[0][0]

        # 5️⃣ 生成 JWT Token
        payload = {"UserID": login_idInput, "RegisterID": ID, "UserName": name}
        token = jwtT.generateToken(payload)

        # 6️⃣ 回傳資料（保持原格式 + token）
        return {
            "status": True,
            "notify": "登入成功 !",
            "UserID": login_idInput,
            "UserName": name,
            "RegisterID": ID,
            "token": token
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"登入失敗 ! 錯誤訊息 : {type(e)} | {e}"
        }
