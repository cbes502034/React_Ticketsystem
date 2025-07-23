def GetProfileData(tools,request):
    def TupleToList(data):
        return list(map(lambda _:list(_),data))
    try:
        login_id = request.session["User"]
        columns = ["login_id",
                   "name",
                   "gender",
                   "birthday",
                   "email",
                   "phone_number",
                   "mobile_number",
                   "address"]
        
        profileData = TupleToList(tools.Sql(
                                                 instruction=f"""SELECT {",".join(columns)} FROM register 
                                                                WHERE login_id=%s""",
                                                 SELECT=True,
                                                 SET=(login_id,)
                                                 ))[0]
        ticketData = [TupleToList(tools.Sql(
                                                instruction="""SELECT *FROM ticket 
                                                               WHERE login_id=%s""",
                                                SELECT=True,
                                                SET=(login_id,)
                                                ))]
        
        profileData = profileData+ticketData
    
        profileData = dict(zip(columns+["ticket"],profileData))
        
        return {"status":True,
                "notify":"會員資料提取完成 !",
                "profileData":profileData}
    
    except Exception as e:
        return {"status":True,
                "notify":f"會員資料提取失敗 ! 錯誤訊息 : {type(e)} | {e}"}