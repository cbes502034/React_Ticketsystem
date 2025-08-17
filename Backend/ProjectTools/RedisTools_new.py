"""
模組名稱：RedisTools.py
功能說明：
    - Redis 操作封裝
    - 支援 URL 初始化
    - 高併發座位鎖 + Token Blacklist
"""

import redis
import time
from urllib.parse import urlparse

class RedisTools:
    def __init__(self, url: str):
        """
        初始化 Redis 連線
        url 範例：redis://:password@host:port/db
        """
        parsed = urlparse(url)
        db_index = int(parsed.path.lstrip("/") or 0)
        self.client = redis.Redis(
            host=parsed.hostname,
            port=parsed.port,
            db=db_index,
            password=parsed.password,
            decode_responses=True
        )

    # ------------------------
    # 1️⃣ 高併發座位鎖
    # ------------------------
    def acquireLock(self, key, timeout=5):
        """嘗試取得鎖，使用 SETNX 避免重複搶票"""
        expire_time = int(time.time()) + timeout + 1
        return self.client.set(key, expire_time, nx=True, ex=timeout)

    def releaseLock(self, key):
        """釋放鎖"""
        self.client.delete(key)

    # ------------------------
    # 2️⃣ Token Blacklist
    # ------------------------
    def addTokenToBlacklist(self, token, ttl=3600):
        """將 JWT Token 加入黑名單"""
        self.client.setex(f"blacklist:{token}", ttl, 1)

    def isTokenBlacklisted(self, token):
        """檢查 JWT Token 是否在黑名單"""
        return self.client.exists(f"blacklist:{token}") == 1
