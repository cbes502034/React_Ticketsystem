async def Check(tools,request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        try:
            data = response["data"]
            login_id = data["login_id"]
            password = data["password"]
            if not tools.Sql(
                         instruction="""SELECT * FROM register 
                                        WHERE login_id=%s AND password=%s""",
                         SELECT=True,
                         SET=(
                                login_id,
                                password
                                )
                         ):
                return {"status":False,
                        "notify":"登入失敗 ! \n請檢查 帳號、密碼、信箱 是否正確 !"}
            
            request.session["User"] = login_id
            return {"status":True,
                    "notify":"登入成功 !",
                    "session":request.session["User"]}
        except Exception as e:
            return {"status":False,
                    "notify":f"登入失敗 ! 錯誤訊息 : {type(e)} | {e}"}
    return response
    
    