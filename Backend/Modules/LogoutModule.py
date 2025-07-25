async def Logout(request):
    del request.session["UserName"]
    del request.session["UserID"]
    return {"status":True,
            "notify":"登出成功 !",
            "session":"尚未登入"}