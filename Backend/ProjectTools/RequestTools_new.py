"""
模組名稱：RequestTools.py
功能說明：
    - 封裝 FastAPI Request JSON 解析
    - 最小化錯誤捕捉
"""

class RequestTools:
    async def GetJson(self, request):
        """解析請求的 JSON 資料"""
        try:
            return await request.json()
        except Exception:
            return {}
