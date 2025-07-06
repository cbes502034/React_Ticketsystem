from fastapi import FastAPI,Path,Query,Form,Request
from starlette.middleware.sessions import SessionMiddleware
from typing import Annotated
from fastapi.responses import JSONResponse,PlainTextResponse,HTMLResponse,FileResponse,RedirectResponse 
from fastapi.staticfiles import StaticFiles
import pymysql

app = FastAPI()
USER = "root"
PASSWORD = "610158"
HOST = "localhost"
app.add_middleware(SessionMiddleware,secret_key="key")
def SQL(db, instruction, SELECT=False, SET=None):
    con = pymysql.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        database=db
    )
    cur = con.cursor()
    if SELECT:
        cur.execute(instruction, SET)
        result = cur.fetchall()
        con.close()
        return result
    else:
        if SET:
            cur.execute(instruction, SET)
        else:
            cur.execute(instruction)
        con.commit()
        con.close()
def session_check(username):
    if username:
        return JSONResponse({"status": True, "username": username,"message": "您好，"+username})
    else:
        return JSONResponse({"status": False, "message":"尚未登入"})

#@app.get("/user_session")
#asyan def user_session():

@app.post("/account_created")
async def account_created(
                            username: str = Form(),
                            id_number : str = Form(),
                            password: str = Form(),
                            real_name : str = Form(),
                            gender : str = Form(),
                            birthday : str = Form(),
                            email: str = Form(),
                            phone_office :str = Form(),#公司電話應該也不用
                            phone_home : str = Form(),#家電應該也不用
                            mobile : str = Form(),
                            address : str = Form()#我覺得這個應該不用加
                            ):
    SQL(
        db="project",
        instruction="""INSERT INTO register(username,id_number,password,real_name,gender,
                                            birthday,email,phone_office,phone_home,mobile,address)
                       VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
        SET=(
                username,
                id_number,
                password,
                real_name,
                gender,
                birthday,
                email,
                phone_office,
                phone_home,
                mobile,
                address
                )
        )
    return RedirectResponse(url="/account_created.html", status_code=303)

@app.post("/ticket_success")
async def ticket_success(
                            event: str = Form(),
                            type_: str = Form(),
                            zone: str = Form(),
                            quantity : int = Form()
                            ):
    SQL(
        db="project",
        instruction = """INSERT INTO ticket(event,type_,zone,quantity)
                         VALUES(%s,%s,%s,%s)""",
        SET=(event,type_,zone,quantity)
        )
    return RedirectResponse(url="/ticket_success.html", status_code=303)



@app.post("/login")
async def login(
                    username: str = Form(),
                    password: str = Form(),
                    email: str = Form()
                    ):
    result = SQL(
                 db="project",
                 instruction="""SELECT * FROM register 
                                WHERE username=%s AND password=%s AND email=%s""",
                 SELECT=True,
                 SET=(
                        username,
                        password,
                        email
                        )
                 )
    if result:

        return JSONResponse(
                            status_code=200,
                            content={
                                    "status":True,
                                    "message":"登入成功",
                                    "username":username
                                     }
                            )
    else:
        return JSONResponse(
                            status_code=200,
                            content={
                                    "status":False,
                                    "message":"帳號、密碼或信箱錯誤"
                                     }
                            )
@app.post("/login_success")
async def login_success(request:Request):
    data = await request.json()
    username = data["username"]
    request.session["USER"] = username
    return JSONResponse({"username": username})


@app.get("/logout_success")
async def logout_success(request:Request):
    del request.session["USER"]
    return session_check(request.session.get("USER"))

@app.get("/check_login")
async def check_login(request: Request):
    return session_check(request.session.get("USER"))

@app.get("/api/concerts")
async def get_concerts():
    result = SQL(
        db="project",
        instruction="SELECT id, name, date, location, image_url, content FROM concerts",
        SELECT=True
    )
    concerts = [
        {
            "id": row[0],#sql 設定歌手名稱
            "name": row[1],#sql 設定演唱會名稱
            "date": row[2],#sql 設定演唱會日期
            "location": row[3],#sql 設定演唱會地點
            "image_url": row[4],   # image URL or path
            "content": row[5],     # description/content
        }
        for row in result
    ]
    return concerts

#=======================================================================
app.mount("/",StaticFiles(directory="演唱會訂票系統實務專題",html=True))