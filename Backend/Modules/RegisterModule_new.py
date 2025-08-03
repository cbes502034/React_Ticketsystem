"""
模組名稱：RegisterModule.py
功能說明：
    1. 生成 Google Authenticator TOTP QR Code
    2. 驗證一次性驗證碼並完成使用者註冊
    - 無 Session
    - 不 import Tools，依賴 main.py 傳入的工具實例
"""

async def ShowQRcode(request, reqT, totpT):
    """
    功能：
        - 生成新的 TOTP Secret
        - 生成 QR Code Base64 字串
    回傳：
        {
            "status": True/False,
            "notify": str,
            "secret": str,
            "qrcode": str (Base64)
        }
    """
    try:
        # 1️⃣ 解析前端請求（可選帶 username，用於 QR Code 顯示）
        response = await reqT.GetJson(request=request)
        username = None
        if response and "data" in response:
            username = response["data"].get("username") or "user"
        else:
            username = "user"

        # 2️⃣ 生成隨機密鑰
        secret = totpT.getSecret()

        # 3️⃣ 生成 QR Code Base64（前端 <img> 可直接顯示）
        qrcode_base64 = totpT.generateQRCodeBase64(username=username, secret=secret)

        # 4️⃣ 回傳
        return {
            "status": True,
            "notify": "請使用 Google Authenticator 掃描 QR Code",
            "secret": secret,
            "qrcode": f"data:image/png;base64,{qrcode_base64}"
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"產生 QR Code 失敗 : {type(e)} | {e}",
            "secret": None,
            "qrcode": None
        }


async def CheckANDRegister(request, reqT, sqlT, totpT):
    """
    功能：
        - 接收前端的註冊資料與一次性驗證碼
        - 驗證 TOTP
        - 註冊成功後將資料寫入資料庫
    回傳：
        {
            "status": True/False,
            "notify": str,
            "RegisterID": int 或 None
        }
    """
    try:
        # 1️⃣ 解析前端請求
        response = await reqT.GetJson(request=request)
        if not response or "data" not in response:
            return {"status": False, "notify": "請求格式錯誤", "RegisterID": None}

        data = response["data"]
        username = data.get("username")
        password = data.get("password")
        secret = data.get("secret")
        otp_code = data.get("otp")

        if not all([username, password, secret, otp_code]):
            return {"status": False, "notify": "缺少註冊資料", "RegisterID": None}

        # 2️⃣ 驗證一次性驗證碼
        if not totpT.verifyCode(secret, otp_code):
            return {"status": False, "notify": "驗證碼錯誤", "RegisterID": None}

        # 3️⃣ 寫入使用者資料
        sqlT.execute(
            """INSERT INTO register (login_id, password, name) VALUES (%s, %s, %s)""",
            SELECT=False,
            SET=(username, password, username)
        )

        # 4️⃣ 取得使用者的 RegisterID
        register_id = sqlT.execute(
            """SELECT id FROM register WHERE login_id = %s""",
            SELECT=True,
            SET=(username,)
        )[0][0]

        # 5️⃣ 回傳成功結果
        return {
            "status": True,
            "notify": "註冊成功 !",
            "RegisterID": register_id
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"註冊失敗 ! 錯誤訊息 : {type(e)} | {e}",
            "RegisterID": None
        }
