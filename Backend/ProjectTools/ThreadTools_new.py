"""
模組名稱：ThreadTools.py
功能說明：
    - 執行緒池封裝
    - 非阻塞執行耗時操作（如 SQL 查詢）
    - 自動錯誤捕捉與資源釋放
"""

import asyncio
from concurrent.futures import ThreadPoolExecutor

class ThreadTools:
    def __init__(self, max_workers=5):
        self.executor = ThreadPoolExecutor(max_workers=max_workers)
        self.loop = asyncio.get_event_loop()

    async def runAsync(self, func, *args, **kwargs):
        """非阻塞執行函數"""
        try:
            return await self.loop.run_in_executor(self.executor, lambda: func(*args, **kwargs))
        except Exception:
            return None

    def close(self):
        """釋放執行緒池資源"""
        self.executor.shutdown(wait=False)
