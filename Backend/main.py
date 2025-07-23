from fastapi import FastAPI,Request
from starlette.middleware.sessions import SessionMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from .ProjectTools.Tools import Tools
from .Modules import RegisterModule,LoginModule,IndexModule,LogoutModule,ProfileModule,TicketModule

import os
from Modules import RegisterModule,LoginModule,IndexModule,LogoutModule,ProfileModule,TicketModule

app = FastAPI()
KEY = "ticket_key"
app.add_middleware(SessionMiddleware,secret_key=KEY)
#mysql://root:DdAmmOtQGtxHmxhCiTZTxYmSgrnLlBSk@gondola.proxy.rlwy.net:51385/railway
'''
tools = Tools(
                USER = "root",
                PASSWORD = "DdAmmOtQGtxHmxhCiTZTxYmSgrnLlBSk",
                HOST = "gondola.proxy.rlwy.net",
                PORT = 51385,
                DATABASE = "GJun"
              )
'''
import os
from dotenv import load_dotenv
load_dotenv()
tools = Tools(
                USER = os.getenv("MYSQLUSER"),
                PASSWORD = os.getenv("MYSQLPASSWORD"),
                HOST = os.getenv("MYSQLHOST"),
                PORT = int(os.getenv("MYSQLPORT")),
                DATABASE = os.getenv("MYSQLPORT")
              )
#'''
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

@app.get("/auth/logout")
async def Logout(request:Request):
    response = await LogoutModule.Logout(request = request)
    return JSONResponse(response)

@app.post("/profile")
async def Profile(request:Request):
    response = ProfileModule.GetProfileData(tools=tools,request=request)
    return JSONResponse(response)
    
@app.get("/auth/user")
async def User(request : Request):
    response = IndexModule.CheckUserLogin(request=request)
    return JSONResponse(response)

@app.post("/ticket")
async def Ticket(request : Request):
    response = await TicketModule.GetTicketData(tools=tools, request=request)
    return JSONResponse(response)

app.mount("/", StaticFiles(directory="Backend/dist", html=True))