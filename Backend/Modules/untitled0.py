from Tools.Tools import Tools
def TupleToList(data):
    return list(map(lambda _:list(_),data))
tools = Tools(
                USER = "root",
                PASSWORD = "DdAmmOtQGtxHmxhCiTZTxYmSgrnLlBSk",
                HOST = "gondola.proxy.rlwy.net",
                PORT = 51385,
                DATABASE = "GJun"
              )
profileData = TupleToList(tools.Sql(
                                          instruction="""SELECT *FROM register 
                                                         WHERE login_id=%s""",
                                          SELECT=True,
                                          SET=("12",)
                                          ))[0]

ticketData = [TupleToList(tools.Sql(
                                        instruction="""SELECT *FROM ticket 
                                                       WHERE login_id=%s""",
                                        SELECT=True,
                                        SET=("12",)
                                        ))]
print(profileData)
print(ticketData)