import os
from fastapi import FastAPI, Request
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

# -------------------------
# 工具導入
# -------------------------
from ProjectTools.SqlTools import SqlTools
from ProjectTools.RequestTools import RequestTools
from ProjectTools.TotpTools import TotpTools
from ProjectTools.RedisTools import RedisTools
from ProjectTools.JwtTools import JwtTools
from ProjectTools.ThreadTools import ThreadTools

# -------------------------
# 模組導入
# -------------------------
from Modules import RegisterModule, LoginModule, IndexModule, LogoutModule, ProfileModule, TicketModule

# -------------------------
# FastAPI 初始化
# -------------------------
app = FastAPI()
KEY = "ticket_key"
app.add_middleware(SessionMiddleware, secret_key=KEY)

# -------------------------
# 1️⃣ 環境變數讀取
# -------------------------
MYSQL_URL = os.getenv("MYSQLPUBLICURL")
REDIS_URL = os.getenv("REDISPUBLICURL")

if not MYSQL_URL:
    raise RuntimeError("❌ 必須設定 MYSQLPUBLICURL")
if not REDIS_URL:
    raise RuntimeError("❌ 必須設定 REDISPUBLICURL")

# -------------------------
# 2️⃣ 工具初始化
# -------------------------
reqT = RequestTools()
totpT = TotpTools()
sqlT = SqlTools(MYSQL_URL)                 # MySQL URL 初始化
redisT = RedisTools(REDIS_URL)             # Redis URL 初始化
jwtT = JwtTools(secret="mysecret",
                algorithm="HS256",
                expire_minutes=30,
                redisT=redisT)
threadT = ThreadTools(max_workers=5)       # 執行緒池

# -------------------------
# 3️⃣ API 路由（保留原邏輯）
# -------------------------

@app.post("/auth/verify/init")
async def ShowQRcode(request: Request):
    """
    功能：生成 Google Authenticator QR Code
    回傳：JSON
    """
    response = await RegisterModule.ShowQRcode(
        request=request,
        reqT=reqT,
        totpT=totpT
    )
    return JSONResponse(response)


@app.post("/auth/verify/confirm")
async def Register(request: Request):
    """
    功能：驗證一次性驗證碼並完成註冊
    回傳：JSON
    """
    response = await RegisterModule.CheckANDRegister(
        request=request,
        reqT=reqT,
        sqlT=sqlT,
        totpT=totpT
    )
    return JSONResponse(response)


@app.post("/auth/login")
async def Login(request: Request):
    """
    功能：使用帳號密碼登入
    強化：
        - JWT 無狀態登入
        - Redis Token Blacklist 支援
    回傳：JSON
    """
    response = await LoginModule.Check(
        request=request,
        reqT=reqT,
        sqlT=sqlT,
        jwtT=jwtT,
        redisT=redisT
    )
    return JSONResponse(response)



@app.get("/auth/logout")
async def Logout(request: Request):
    response = await LogoutModule.Logout(
        request=request,
        jwtT=jwtT,
        redisT=redisT
    )
    return JSONResponse(response)


@app.get("/auth/profile")
async def Profile(request: Request):
    """
    功能：取得會員中心個人資料與票券資料
    強化：
        - 使用 JWT 無狀態驗證
        - 無 Session
    回傳：JSON
    """
    response = await ProfileModule.GetProfileData(
        request=request,
        sqlT=sqlT,
        jwtT=jwtT
    )
    return JSONResponse(response)


@app.get("/auth/user")
async def User(request: Request):
    """
    功能：檢查使用者登入狀態
    強化：
        - 純 JWT 驗證登入
        - 無 Session
    回傳：JSON
    """
    response = await IndexModule.CheckUserLogin(
        request=request,
        jwtT=jwtT
    )
    return JSONResponse(response)



@app.post("/ticket/data")
async def TicketData(request: Request):
    """
    功能：取得指定活動的票務資料
    強化：
        - Redis 高併發座位鎖
        - ThreadTools 非阻塞 SQL 查詢
        - 保留 JOIN 與 TOTP 驗證
    回傳：JSON
    """
    response = await TicketModule.GetTicketData(
        request=request,
        reqT=reqT,
        sqlT=sqlT,
        totpT=totpT,
        redisT=redisT,
        threadT=threadT
    )
    return JSONResponse(response)


@app.post("/ticket/check")
async def CheckPurchased(request: Request):
    """
    功能：檢查使用者是否已購票
    強化：
        - 保留原邏輯
        - 無 Session
    回傳：JSON
    """
    response = await TicketModule.CheckTicketPurchased(
        request=request,
        reqT=reqT,
        sqlT=sqlT
    )
    return JSONResponse(response)



# -------------------------
# 4️⃣ 前端靜態檔案
# -------------------------
app.mount("/", StaticFiles(directory="Frontend", html=True))
