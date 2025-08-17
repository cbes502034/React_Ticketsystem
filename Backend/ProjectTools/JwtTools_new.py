"""
模組名稱：JwtTools.py
功能說明：
    - JWT 無狀態登入驗證
    - 支援 Redis Token Blacklist
"""

import jwt
import datetime
from ProjectTools.RedisTools import RedisTools

class JwtTools:
    def __init__(self, secret="jwt_secret_key", algorithm="HS256", expire_minutes=30, redisT: RedisTools=None):
        self.secret = secret
        self.algorithm = algorithm
        self.expire_minutes = expire_minutes
        self.redis = redisT

    def generateToken(self, data: dict):
        """生成 JWT Token"""
        payload = data.copy()
        payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(minutes=self.expire_minutes)
        return jwt.encode(payload, self.secret, algorithm=self.algorithm)

    def verifyToken(self, token: str):
        """驗證 JWT Token，有效回傳 payload，無效回傳 None"""
        try:
            if self.redis and self.redis.isTokenBlacklisted(token):
                return None
            return jwt.decode(token, self.secret, algorithms=[self.algorithm])
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def blacklistToken(self, token: str):
        """將 Token 加入黑名單"""
        if self.redis:
            self.redis.addTokenToBlacklist(token)
