import pymysql

class Tools:
    def __init__(self, USER, PASSWORD, HOST, PORT, DATABASE):
        self.user = USER
        self.password = PASSWORD
        self.host = HOST
        self.port = PORT
        self.database = DATABASE
        print(f"[DB INIT] Connecting to DB: {self.database}")

    def Sql(self, instruction, SELECT=False, SET=None):
        con = pymysql.connect(
            user=self.user,
            password=self.password,
            host=self.host,
            port=self.port,
            database=self.database
        )
        cur = con.cursor()
        try:
            if SELECT:
                cur.execute(instruction, SET)
                result = cur.fetchall()
                return result
            else:
                cur.execute(instruction, SET) if SET else cur.execute(instruction)
                con.commit()
        finally:
            con.close()

    async def GetRequestData(self, request):
        try:
            data = await request.json()
            return {"status": True, "notify": "前端資料取得成功 !", "data": data}
        except Exception as e:
            return {"status": False, "notify": f"前端資料取得失敗 ! 失敗原因 : {type(e)} | {str(e)}"}
