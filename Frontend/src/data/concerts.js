import coldplay from '../assets/coldplay.jpeg'
import Radiohead from '../assets/radiohead.jpeg'
import Bowie from '../assets/David bowie.jpeg'
import GAGA from '../assets/Ladygaga.jpeg'
import LinkinPark from '../assets/Linkinpark.jpeg'
import YOASOBI from '../assets/yoasobi.jpeg'
import Chappell from '../assets/Chappell_Rhttps.jpeg'
import GreenDay from '../assets/Green_day.jpg'
import DaftPunk from '../assets/Daft_Punk.jpg'
import Lee from '../assets/Lee.jpeg'

const concerts = [
  {
    "id": 1,
    "name": "Radiohead World Tour 2025",
    "date": "2025-10-12",
    "time": "6:00 PM",
    "location": "台北大巨蛋",
    "aliases": ["radiohead", "Radio Head", "雷射頭", "雷電頭", "雷帝歐黑德", "radio head"],
    "image_url": Radiohead,
     alt_dates: [
    { date: "2025-10-12", city: "台北大巨蛋" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
   "price": "NT$ 2800 ~ NT$ 6800",


  },
  {
    "id": 2,
    "name": "Coldplay Music of the Spheres Live",
    "date": "2025-11-05",
    "time": "4:00 PM",
    "location": "高雄巨蛋",
    "aliases": ["酷玩", "cold play", "冷玩樂團","台北","Taipei"],
    "image_url": coldplay,
     alt_dates: [
    { date: "2025-11-05", city: "高雄巨蛋" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",
    "description": "Coldplay 世界巡迴台灣站震撼來襲...",
    "note": "請提前30分鐘入場，嚴禁攜帶外食..."
  },
  {
    "id": 3,
    "name": "David Bowie Tribute Concert",
    "date": "2025-08-30",
    "time": "7:00 PM",
    "location": "高雄流行音樂中心",
    "location-id":"Kaohsiung",
    "aliases": ["david bowie", "大衛鮑伊", "大衛鮑威", "戴維鮑伊", "d. bowie", "david b."],
    "image_url": Bowie,
     alt_dates: [
    { date: "2025-08-12", city: "高雄流行音樂中心" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",

  },
  {
    "id": 4,
    "name": "Lady Gaga Chromatica Ball",
    "date": "2025-09-21",
    "time": "8:00 PM",
    "location": "台北大巨蛋",
    "location-id":"Taipei",
    "aliases": ["lady gaga", "雷迪嘎嘎", "女神卡卡", "嘎嘎", "嘎嘎小姐", "gaga", "lady g."],
    "image_url": GAGA,
    alt_dates: [
    { date: "2025-09-21", city: "台北大巨蛋" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",

  },
  {
    "id": 5,
    "name": "Linkin Park Legacy Tour",
    "date": "2025-12-01",
    "time": "7:30 PM",
    "location": "林口體育館",
    "location-id":"New Taipei",
    "aliases": ["linkin park", "林肯公園", "林金帕克", "linken park", "linking park"],
    "image_url": LinkinPark,
     alt_dates: [
    { date: "2025-12-01", city: "林口體育館" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",
  },
  {
    "id": 6,
    "name": "YOASOBI Asia Tour 2025",
    "date": "2025-10-18",
    "time": "3:00 PM",
    "location": "台北小巨蛋",
    "location-id":"Taipei",
    "aliases": ["yoasobi", "夜遊", "夜遊bi", "ヨアソビ", "YOA SOBI", "yoa sobi"],
    "image_url": YOASOBI,
    alt_dates: [
    { date: "2025-10-18", city: "台北小巨蛋" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
  "price": "NT$ 2800 ~ NT$ 6800",
  },
  {
    "id": 7,
    "name": "Chappell Roan: The Rise and Fall Tour",
    "date": "2025-11-20",
    "time": "6:30 PM",
    "location": "Legacy Taipei",
    "location-id":"Taipei",
    "aliases": ["chappell roan", "chapel roan", "chappel roan", "夏普羅安", "夏佩兒羅安"],
    "image_url": Chappell,
    alt_dates: [
    { date: "2025-11-20", city: "Legacy Taipei" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
  "price": "NT$ 2800 ~ NT$ 6800",
  },
  {
    "id": 8,
    "name": "Green Day - The American Idiot Revival",
    "date": "2025-09-09",
    "time": "6:00 PM",
    "location": "台中圓滿戶外劇場",
    "aliases": ["green day", "綠日", "綠日合唱團", "綠黨", "green days"],
    "image_url": GreenDay,
     alt_dates: [
    { date: "2025-09-09", city: "台中圓滿戶外劇場" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",
  },
  {
    "id": 9,
    "name": "Daft Punk Reunion DJ Night",
    "date": "2025-08-25",
    "time": "10:00 PM",
    "location": "台北信義 Warehouse",
    "aliases": ["chappell roan", "chapel roan", "chappel roan", "夏普羅安", "夏佩兒羅安"],
    "location-id":"Taipei",
    "aliases": ["daft punk", "達夫龐克", "傻瓜龐克", "打夫龐克", "達夫朋克", "daftpunk"],
    "image_url": DaftPunk,
     alt_dates: [
    { date: "2025-08-25", city: "台北信義 Warehouse" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",
  },
  {
    "id": 10,
    "name": "李竺芯 水噹噹",
    "date": "2025-10-28",
    "time": "7:30 PM",
    "location": "台北大巨蛋",
    "location-id":"Taipei",
    "image_url": Lee,
    alt_dates: [
    { date: "2025-10-28", city: "台北大巨蛋" }
  ],
  info: [
    "票券不得用於商業用途，如比賽、抽獎等。",
    "若違反規定，票券可能作廢且不退款。",
    "主辦單位不對票券轉讓所造成的損失負責。"
  ],
    "price": "NT$ 2800 ~ NT$ 6800",
  }
]
export default concerts
