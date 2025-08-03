async def Check(tools, request):
    response = await tools.GetRequestData(request=request)
    if response["status"]:
        try:
            data = response["data"]
            login_idInput = data["login_id"]
            passwordInput = data["password"]

            userData = tools.Sql(
                instruction="""
                    SELECT login_id, name, id 
                    FROM registerlist 
                    WHERE login_id=%s AND password=%s
                """,
                SELECT=True,
                SET=(login_idInput, passwordInput)
            )

            if userData:
                login_id, name, ID = userData[0]
                request.session["UserID"] = login_id
                request.session["UserName"] = name
                request.session["RegisterID"] = ID
                return {
                    "status": True,
                    "notify": "登入成功 !",
                    "UserID": login_id,
                    "UserName": name,
                    "RegisterID": ID
                }
            else:
                return {
                    "status": False,
                    "notify": "登入失敗！帳號或密碼錯誤"
                }

        except Exception as e:
            return {
                "status": False,
                "notify": f"登入失敗 ! 錯誤訊息 : {type(e)} | {e}"
            }
    else:
        # tools.GetRequestData(request) 失敗
        return {
            "status": False,
            "notify": "登入請求資料格式錯誤"
        }
