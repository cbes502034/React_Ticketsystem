async def CreateUser(tools,request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        try:
            data = response["data"]
            login_id = data["login_id"]
            password = data["password"]
            name = data["name"]
            gender = data["gender"]
            birthday = data["birthday"]
            email = data["email"]
            phone_number = data["phone_number"]
            mobile_number = data["mobile_number"]
            address = data["address"]
            tools.Sql(instruction="""INSERT INTO register(login_id,
                                                          password,
                                                          name,
                                                          gender,
                                                          birthday,
                                                          email,
                                                          phone_number,
                                                          mobile_number,
                                                          address)
                                     VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                                     SET=(login_id,
                                          password,
                                          name,
                                          gender,
                                          birthday,
                                          email,
                                          phone_number,
                                          mobile_number,
                                          address))
    
            return {"status":True,"notify":"註冊成功 !"}
        except Exception as e:
            return {"status":False,"notify":f"註冊失敗 ! 錯誤訊息 : {type(e)} | {e}"}
    return response