"""
模組名稱：IndexModule.py
功能說明：
    - 檢查使用者登入狀態（純 JWT 無 Session）
    - 不 import 工具模組，僅依賴 main.py 傳入的工具實例
"""

async def CheckUserLogin(request, jwtT):
    """
    功能：
        - 從 Header 取得 JWT
        - 驗證登入狀態
    回傳：
        {
            "status": True/False,
            "notify": "已登入/未登入",
            "user": dict or None
        }
    """
    try:
        # 1️⃣ 從 Header 取得 JWT
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return {
                "status": False,
                "notify": "未登入",
                "user": None
            }

        token = auth_header.split(" ")[1]

        # 2️⃣ 驗證 Token
        payload = jwtT.verifyToken(token)
        if not payload:
            return {
                "status": False,
                "notify": "未登入或 Token 無效",
                "user": None
            }

        # 3️⃣ 登入成功，回傳使用者資訊
        return {
            "status": True,
            "notify": "已登入",
            "user": {
                "UserID": payload.get("UserID"),
                "UserName": payload.get("UserName"),
                "RegisterID": payload.get("RegisterID")
            }
        }

    except Exception as e:
        return {
            "status": False,
            "notify": f"檢查登入狀態失敗 : {type(e)} | {e}",
            "user": None
        }
