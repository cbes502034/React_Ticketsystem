from fastapi.encoders import jsonable_encoder

"""
模組名稱：ProfileModule.py
功能說明：
    - 提供會員中心個人資料查詢與票券紀錄
    - 無 Session，改用 JWT 驗證
    - 不 import Tools，依賴 main.py 傳入的工具實例
"""

async def GetProfileData(request, sqlT, jwtT):
    """
    功能：
        - 驗證 JWT Token
        - 取得該使用者的個人資料與票券資料
    回傳：
        {
            "status": True/False,
            "notify": str,
            "profileData": dict 或 None
        }
    """
    def TupleToList(data):
        return list(map(lambda _: list(_), data))

    try:
        # 1️⃣ 從 Header 取得 JWT
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return {
                "status": False,
                "notify": "未登入",
                "profileData": None
            }

        token = auth_header.split(" ")[1]

        # 2️⃣ 驗證 Token
        payload = jwtT.verifyToken(token)
        if not payload:
            return {
                "status": False,
                "notify": "Token 無效或已過期",
                "profileData": None
            }

        login_id = payload.get("UserID")
        registerID = payload.get("RegisterID")

        # 3️⃣ 定義欄位
        profileColumn = [
            "login_id","name","gender","birthday",
            "email","phone_number","mobile_number","address"
        ]
        ticketColumn = [
            "title","date","location","area","`row`","`column`"
        ]

        # 4️⃣ 查詢會員基本資料
        profileData = TupleToList(sqlT.execute(
            instruction=f"""SELECT {",".join(profileColumn)}
                            FROM register
                            WHERE login_id=%s""",
            SELECT=True,
            SET=(login_id,)
        ))[0]

        # 5️⃣ 查詢票券資料
        ticketData = TupleToList(sqlT.execute(
            instruction=f"""SELECT {",".join(ticketColumn)}
                            FROM ticket
                            INNER JOIN `event`
                            ON `event`.id = ticket.event_id
                            WHERE register_id = %s""",
            SELECT=True,
            SET=(registerID,)
        ))

        # 6️⃣ 組合座位字串
        for i in range(len(ticketData)):
            seat = ticketData[i]
            column = seat.pop()
            row = seat.pop()
            area = seat.pop()
            seat += [f"{area:<6} | 第{row:>2}排 第{column:>2}位"]
            ticketData[i] = seat

        # 7️⃣ 組合回傳資料
        profileData = profileData + [ticketData]
        profileData = dict(zip(profileColumn + ["ticket"], profileData))

        return {
            "status": True,
            "notify": "會員資料提取完成 !",
            "profileData": jsonable_encoder(profileData)
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"會員資料提取失敗 ! 錯誤訊息 : {type(e)} | {e}",
            "profileData": None
        }
