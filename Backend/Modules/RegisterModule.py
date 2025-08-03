from ..ProjectTools import TOTP
async def ShowQRcode(tools,request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        data = response["data"]
        email = data["email"]
        secret = TOTP.GetSecret(request=request)
        totpobject = TOTP.GetTOTPObject(secret=secret)
        uri = TOTP.GetURI(totpobject=totpobject,email=email)
        src = TOTP.getQRcodeSrc(uri=uri)
        return {"status":True,"totpsrc":src}
    else:
        return {"status":False}
    
async def CheckANDRegister(tools,request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        try:
            data = response["data"]
            login_id = data["login_id"]
            IdType = data["IdType"]
            loginType = data["loginType"]
            password = data["password"]
            name = data["name"]
            gender = data["gender"]
            birthday = data["birthday"]
            email = data["email"]
            phone_number = data["phone_number"]
            mobile_number = data["mobile_number"]
            address = data["address"]
            user_input = data["user_input"]
            
            secret = request.session["secret"]
            totpobject = TOTP.GetTOTPObject(secret=secret)
            if user_input==totpobject.now():
                tools.Sql(instruction="""INSERT INTO registerlist(login_id,
                                                              IdType,
                                                              loginType,
                                                              password,
                                                              name,
                                                              gender,
                                                              birthday,
                                                              email,
                                                              phone_number,
                                                             mobile_number,
                                                                   address,
                                                                    secret)
                                         VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                                     SET=(login_id,
                                          IdType,
                                          loginType,
                                          password,
                                          name,
                                          gender,
                                          birthday,
                                          email,
                                          phone_number,
                                          mobile_number,
                                          address,
                                          secret))
                del request.session["secret"]
                return {"status":True,
                        "notify":"註冊成功 !",
                        "secret":secret}
            else:
                return {"status":False,
                        "notify":"註冊失敗 !"}
 
        except Exception as e:
            return {"status":False,"notify":f"註冊失敗 ! 錯誤訊息 : {type(e)} | {e}"}
    return response
