async def Check(tools,request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        try:
            data = response["data"]
            login_idInput = data["login_id"]
            passwordInput = data["password"]
            userData = tools.Sql(instruction="""SELECT login_id,password FROM register
                                                WHERE login_id=%s AND password=%s""",
                                 SELECT=True,
                                 SET=(login_idInput,passwordInput))
            if userData:
                name = tools.Sql(instruction="""SELECT name FROM register
                                                WHERE login_id=%s AND password=%s""",
                                                SELECT=True,
                                                SET=(login_idInput,passwordInput))[0][0]
                ID = tools.Sql(instruction="""SELECT id FROM register 
                                                WHERE login_id=%s AND password=%s""",
                                                SELECT=True,
                                                SET=(login_idInput,passwordInput))[0][0]
                request.session["UserID"] = login_idInput
                request.session["UserName"] = name
                request.session["RegisterID"] = ID
                return{"status":True,
                       "notify":"登入成功 !",
                       "UserID":login_idInput,
                       "UserName":name,
                       "RegisterID":ID}
            else:
                return{"status":False,
                       "notify":"登入失敗 !"}
        except Exception as e:
            return {"status":False,
                    "notify":f"登入失敗 ! 錯誤訊息 : {type(e)} | {e}"}
    return response
