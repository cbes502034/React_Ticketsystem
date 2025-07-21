async def GetTicketData(tools,request):
    response = await tools.GetRequestData(request = request)
    if response["status"]:
        try:
            data = response["data"]
            event = data["event"]
            type = data["type"]
            zone = data["zone"]
            quantity = data["quantity"]
            login_id = request.session["User"]
            tools.Sql(
                instruction = """INSERT INTO ticket(username,event,type_,zone,quantity)
                                 VALUES(%s,%s,%s,%s,%s)""",
                SET=(login_id,event,type,zone,quantity)
                )
            return {"status":False,"notify":"票券資料寫入成功 !"}
        except Exception as e:
            return {"status":True,"notify":f"票券資料寫入失敗 ! 錯誤訊息 : {type(e)} | {e}"}
    return response