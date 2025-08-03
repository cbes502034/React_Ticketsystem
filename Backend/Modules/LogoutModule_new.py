"""
模組名稱：LogoutModule.py
功能說明：
    - 使用者登出（純 JWT 無狀態）
    - 將 Token 加入 Redis Blacklist，使其立即失效
    - 不 import 工具模組，僅依賴 main.py 傳入的工具實例
"""

async def Logout(request, jwtT, redisT):
    """
    功能：
        - 取得 Authorization Header 中的 JWT
        - 驗證 Token
        - 將 Token 加入 Redis Blacklist
    回傳：
        {
            "status": True/False,
            "notify": str,
            "session": "尚未登入"
        }
    """
    try:
        # 1️⃣ 從 Header 取得 JWT
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return {
                "status": False,
                "notify": "未提供 Token，無法登出",
                "session": "尚未登入"
            }

        token = auth_header.split(" ")[1]

        # 2️⃣ 驗證 Token
        payload = jwtT.verifyToken(token)
        if not payload:
            return {
                "status": False,
                "notify": "Token 無效或已過期",
                "session": "尚未登入"
            }

        # 3️⃣ 加入 Redis Blacklist（立即失效）
        jwtT.blacklistToken(token)

        # 4️⃣ 回傳登出成功（無 Session）
        return {
            "status": True,
            "notify": "登出成功 !",
            "session": "尚未登入"
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"登出失敗 ! 錯誤訊息 : {type(e)} | {e}",
            "session": "尚未登入"
        }
