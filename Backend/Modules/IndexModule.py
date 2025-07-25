def CheckUserLogin(request):
    if "UserID" in request.session and "UserName" in request.session:
        return {"status":True,
                "notify":"已經是登入狀態 !",
                "session":request.session["UserName"]}
    return {"status":False,
            "notify":"尚未登入 !",
            "session":"尚未登入"}