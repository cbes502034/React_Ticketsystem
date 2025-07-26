from ..ProjectTools import TOTP
async def Check(tools,request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        try:
            data = response["data"]
            login_id = data["login_id"]
            password = data["password"]
            totpcode = data["totpcode_input"]

            login_idStatus  = bool(tools.Sql(instruction="""SELECT login_id FROM register 
                                                            WHERE login_id=%s""",
                                            SELECT=True,
                                            SET=(login_id,)))
            
            passwordStatus = bool(tools.Sql(instruction="""SELECT password FROM register 
                                                           WHERE login_id=%s""",
                                            SELECT=True,
                                            SET=(login_id,)))
            
            secret = tools.Sql(instruction="""SELECT secret FROM register 
                                              WHERE login_id=%s""",
                                            SELECT=True,
                                            SET=(login_id,))[0][0]
            totpobject = TOTP.GetTOTPObject(secret)
            totpStatus = bool(totpcode == str(totpobject.now()))
            
            notify = []
            if not login_idStatus:notify.append("帳號")
            if not passwordStatus:notify.append("密碼")
            if not totpStatus:notify.append("驗證碼")
            
            notifyString = ""
            for _ in range(len(notify)):
                if _ != len(notify)-1:
                    notifyString+=(notify[_]+"、")
                else:
                    notifyString+=notify[_]
            notify = notifyString
                
            if bool(notify):
                return {"status":False,
                        "notify":f"登入失敗 ! 請檢查 {notify} 是否正確 !"}
            
            name = tools.Sql(instruction="""SELECT name FROM register 
                                                       WHERE login_id=%s AND password=%s AND secret=%s""",
                                            SELECT=True,
                                            SET=(login_id,password,secret))[0][0]
            request.session["UserID"] = login_id
            request.session["UserName"] = name
            return {"status":True,
                    "notify":"登入成功 !",
                    "session":request.session["User"]}
        except Exception as e:
            return {"status":False,
                    "notify":f"登入失敗 ! 錯誤訊息 : {type(e)} | {e}"}
    return response
