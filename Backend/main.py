from fastapi import FastAPI,Request
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from .ProjectTools.Tools import Tools
from .Modules import RegisterModule,LoginModule,IndexModule,LogoutModule,ProfileModule,TicketModule

import os
from dotenv import load_dotenv
from urllib.parse import urlparse
app = FastAPI()
KEY = "ticket_key"
app.add_middleware(SessionMiddleware,secret_key=KEY)
#mysql://root:DdAmmOtQGtxHmxhCiTZTxYmSgrnLlBSk@gondola.proxy.rlwy.net:51385/GJun

load_dotenv()
url = urlparse(os.getenv("MYSQLPUBLICURL"))
tools = Tools(
                USER = url.username,
                PASSWORD = url.password,
                HOST = url.hostname,
                PORT = url.port,
                DATABASE = url.path.lstrip("/")
              )

@app.post("/auth/verify/init")
async def ShowQRcode(request: Request):
    response = await RegisterModule.ShowQRcode(tools=tools,request=request)
    return JSONResponse(response)

@app.post("/auth/verify/confirm")
async def Register(request: Request):
    response = await RegisterModule.CheckANDRegister(tools=tools,request=request)
    return JSONResponse(response)

@app.post("/auth/login")
async def Login(request:Request):
    response = await LoginModule.Check(tools=tools,request=request)
    return JSONResponse(response)

@app.get("/check_login")
async def check_login(request: Request):
    if "UserID" in request.session:
        return JSONResponse({
            "logged_in": True,
            "UserID": request.session["UserID"],
            "UserName": request.session["UserName"],
            "RegisterID": request.session["RegisterID"]
        })
    else:
        return JSONResponse({
            "logged_in": False
        })

@app.get("/auth/logout")
async def Logout(request:Request):
    response = await LogoutModule.Logout(request = request)
    return JSONResponse(response)

@app.get("/profile")
async def get_user_profile(request: Request):
    if "UserID" not in request.session:
        return JSONResponse({"status": False, "notify": "未登入"}, status_code=401)

    return {
        "status": True,
        "user": {
            "login_id": request.session["UserID"],
            "name": request.session["UserName"],
            "register_id": request.session["RegisterID"]
        }
    }
    
@app.get("/auth/user")
async def User(request : Request):
    response = IndexModule.CheckUserLogin(request=request)
    return JSONResponse(response)

@app.post("/ticket")
async def GetTicket(request : Request):
    response = await TicketModule.GetTicketData(tools=tools, request=request)
    return JSONResponse(response)

@app.post("/ticket/availability")
async def GetTicketAvailability(request : Request):
    response = await TicketModule.CheckTicketPurchased(tools=tools, request=request)
    return JSONResponse(response)

app.mount("/", StaticFiles(directory="Backend/dist", html=True))
