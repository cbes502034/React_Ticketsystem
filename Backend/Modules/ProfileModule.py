from fastapi.encoders import jsonable_encoder
def GetProfileData(tools,request):
    def TupleToList(data):
        return list(map(lambda _:list(_),data))
    try:
        login_id = request.session["UserID"]
        profileColumn = ["loginType",
                          "login_id",
                              "name",
                            "gender",
                          "birthday",
                             "email",
                      "phone_number",
                     "mobile_number",
                           "address"]
        
        ticketColumn = ["title",
                         "date",
                     "location",
                         "area",
                        "`row`",
                     "`column`",]
        
        registerID = request.session["RegisterID"]
        
        profileData = TupleToList(tools.Sql(
                                                 instruction=f"""SELECT {",".join(profileColumn)}
                                                                 FROM register 
                                                                 WHERE login_id=%s""",
                                                 SELECT=True,
                                                 SET=(login_id,)
                                                 ))[0]
        ticketData = TupleToList(tools.Sql(
                                                instruction=f"""SELECT {",".join(ticketColumn)} 
                                                                FROM ticket
                                                                INNER JOIN `event` ON  `event`.id = ticket.event_id 
                                                                WHERE register_id = %s""",
                                                SELECT=True,
                                                SET=(registerID,)
                                                ))
        
        for i in range(len(ticketData)):
            seat = ticketData[i]
            column = seat.pop()
            row = seat.pop()
            area = seat.pop()
            seat+=[f"{area:<6} | 第{row:>2}排 第{column:>2}位"]
            ticketData[i] = seat

        profileData = profileData+[ticketData]
    
        profileData = dict(zip(profileColumn+["ticket"],profileData))
        
        
        return {"status":True,
                "notify":"會員資料提取完成 !",
                "profileData":jsonable_encoder(profileData)}
    
    except Exception as e:
        return {"status":True,
                "notify":f"會員資料提取失敗 ! 錯誤訊息 : {type(e)} | {e}"}
