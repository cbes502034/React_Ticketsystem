from ..ProjectTools import TOTP
from fastapi.encoders import jsonable_encoder
async def GetTicketData(tools,request):
    response = await tools.GetRequestData(request = request)
    if response["status"]:
        try:
            data = response["data"]
            event_id = data["event_id"]
            area = data["area"]
            row = data["row"]
            column = data["column"]
            totpcode = data["totpcode_input"]

            register_id = request.session["RegisterID"]
            login_id = request.session["UserID"]
            
            secret = tools.Sql(instruction="""SELECT secret
                                              FROM   register 
                                              WHERE  login_id=%s""",
                               SELECT=True,
                               SET=(login_id,))[0][0]
            totpobject = TOTP.GetTOTPObject(secret)
            
            if totpcode == str(totpobject.now()):
                
                tools.Sql(instruction = """INSERT INTO ticket(register_id,event_id,area,`row`,`column`)
                                           VALUES(%s,%s,%s,%s,%s)""",
                          SET=(register_id,event_id,area,row,column))
                return {"status":True,
                        "notify":"票券資料寫入成功 !"}
            else:
                return {"status":False,
                        "notify":"驗證碼輸入錯誤 !"}
        except Exception as e:
            return {"status":False,
                    "notify":f"票券資料寫入失敗 ! 錯誤訊息 : {type(e)} {e}"}

async def CheckTicketPurchased(tools,request):
    
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        data = response["data"]
        title = data["title"]
        
        event_id = tools.Sql(instruction="""SELECT id FROM event WHERE title=%s""",
                              SELECT=True,
                              SET=(title,))[0][0]
   
        purChased = list(tools.Sql(instruction="""SELECT area,`row`,`column` FROM `event` 
                                                  INNER JOIN ticket 
                                                  ON `event`.id = ticket.event_id 
                                                  WHERE event_id = %s""",
                              SELECT=True,
                              SET=(event_id,)))
        return {"purchased":jsonable_encoder(purChased),
                "event_id":event_id}