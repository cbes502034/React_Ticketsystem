from ..ProjectTools import TOTP
async def GetTicketData(tools,request):
    response = await tools.GetRequestData(request = request)
    if response["status"]:
        try:
            data = response["data"]
            area = data["area"]
            row = data["row"]
            column = data["column"]
            
            
            login_id = request.session["UserID"]
            totpcode = data["totpcode_input"]
            secret = tools.Sql(instruction="""SELECT secret FROM register 
                                              WHERE login_id=%s""",
                                            SELECT=True,
                                            SET=(login_id,))[0][0]
            totpobject = TOTP.GetTOTPObject(secret)
            if totpcode == str(totpobject.now()):
                tools.Sql(instruction = """INSERT INTO ticket(login_id,area,`row`,`column`)
                                           VALUES(%s,%s,%s,%s)""",
                          SET=(login_id,area,row,column))
                return {"status":True,
                        "notify":"票券資料寫入成功 !"}
            else:
                return {"status":False,
                        "notify":"驗證碼輸入錯誤 !"}
        except Exception as e:
            return {"status":False,
                    "notify":f"票券資料寫入失敗 ! 錯誤訊息 : {type(e)} {e}"}
    
async def CheckTicketPurchased(tools,request):
    purChased = tools.Sql(instruction="""SELECT area,`row`,`column` FROM ticket""",
                          SELECT=True)
    return{"purchased":purChased}