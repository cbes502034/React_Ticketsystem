async def GetTicketData(tools,request):
    response = await tools.GetRequestData(request = request)
    if response["status"]:
        try:
            data = response["data"]
            event = data["event"]
            type_ = data["type"]
            zone = data["zone"]
            quantity = data["quantity"]
            login_id = request.session["User"]
            tools.Sql(
                instruction = """INSERT INTO ticket(login_id,event,type,zone,quantity)
                                 VALUES(%s,%s,%s,%s,%s)""",
                SET=(login_id,event,type_,zone,quantity)
                )
            return {"status":True,"notify":"票券資料寫入成功 !"}
        except Exception as e:
            return {"status":False,"notify":f"票券資料寫入失敗 ! 錯誤訊息 : {type(e)} {e}"}
    return response