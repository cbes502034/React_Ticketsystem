"""
模組名稱：SqlTools.py
功能說明：
    - MySQL 連線工具
    - 支援 URL 初始化，例如：
        MYSQLPUBLICURL=mysql://user:password@host:port/database
    - 內部使用連線池，支援高併發
"""

import pymysql
from dbutils.pooled_db import PooledDB
from urllib.parse import urlparse

class SqlTools:
    def __init__(self, url: str, pool_size: int = 5):
        """
        初始化 MySQL 工具
        url 範例：mysql://user:password@host:port/dbname
        """
        parsed = urlparse(url)
        # 初始化連線池
        self.pool = PooledDB(
            creator=pymysql,
            maxconnections=pool_size,
            mincached=1,
            maxcached=pool_size,
            blocking=True,
            host=parsed.hostname,
            port=parsed.port,
            user=parsed.username,
            password=parsed.password,
            database=parsed.path.lstrip("/"),
            charset="utf8mb4"
        )

    def execute(self, instruction: str, SELECT=False, SET=None):
        """
        執行 SQL 指令
        參數：
            instruction：SQL 語句
            SELECT：是否為查詢
            SET：SQL 參數 (tuple)
        回傳：
            - SELECT=True：返回查詢結果 (list)
            - SELECT=False：返回受影響列數 (int)
            - SQL 執行失敗則返回 [] 或 0
        """
        conn = self.pool.connection()
        cur = conn.cursor()
        try:
            cur.execute(instruction, SET)
            if SELECT:
                result = cur.fetchall()
                return list(result)  # 永遠回傳 list，即使空結果
            else:
                conn.commit()
                return cur.rowcount or 0
        except pymysql.MySQLError:
            # SQL 執行錯誤，統一返回空結構
            return [] if SELECT else 0
        finally:
            cur.close()
            conn.close()
