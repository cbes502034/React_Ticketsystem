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

const concertsData = [
  {
    "id": 1,
    "name": "Radiohead World Tour 2025",
    "date": "2025-10-12",
    "location": "台北大巨蛋",
    "aliases": ["酷玩", "cold play", "冷玩樂團","台北","Taipei"],
    "image_url": Radiohead
  },
  {
    "id": 2,
    "name": "Coldplay Music of the Spheres Live",
    "date": "2025-11-05",
    "location": "高雄巨蛋",
    "aliases": ["酷玩", "cold play", "冷玩樂團","台北","Taipei"],
    "image_url": coldplay,
    "price": "NT$ 2800 ~ NT$ 6800",
    "description": "Coldplay 世界巡迴台灣站震撼來襲...",
    "note": "請提前30分鐘入場，嚴禁攜帶外食..."
  },
  {
    "id": 3,
    "name": "David Bowie Tribute Concert",
    "date": "2025-08-30",
    "location": "高雄流行音樂中心",
    "location-id":"Kaohsiung",
    "location-idtw":"高雄",
    "image_url": Bowie
  },
  {
    "id": 4,
    "name": "Lady Gaga Chromatica Ball",
    "date": "2025-09-21",
    "location": "台北大巨蛋",
    "location-id":"Taipei",
    "location-idtw":"台北",
    "image_url": GAGA
  },
  {
    "id": 5,
    "name": "Linkin Park Legacy Tour",
    "date": "2025-12-01",
    "location": "林口體育館",
    "location-id":"New Taipei",
    "location-idtw":"新北",
    "image_url": LinkinPark
  },
  {
    "id": 6,
    "name": "YOASOBI Asia Tour 2025",
    "date": "2025-10-18",
    "location": "台北小巨蛋",
    "location-id":"Taipei",
    "location-idtw":"台北",
    "image_url": YOASOBI
  },
  {
    "id": 7,
    "name": "Chappell Roan: The Rise and Fall Tour",
    "date": "2025-11-20",
    "location": "Legacy Taipei",
    "location-id":"Taipei",
    "location-idtw":"台北",
    "image_url": Chappell
  },
  {
    "id": 8,
    "name": "Green Day - The American Idiot Revival",
    "date": "2025-09-09",
    "location": "台中圓滿戶外劇場",
    "image_url": GreenDay
  },
  {
    "id": 9,
    "name": "Daft Punk Reunion DJ Night",
    "date": "2025-08-25",
    "location": "台北信義 Warehouse",
    "location-id":"Taipei",
    "location-idtw":"台北",
    "image_url": DaftPunk
  },
  {
    "id": 10,
    "name": "李竺芯 水噹噹",
    "date": "2025-10-28",
    "location": "台北大巨蛋",
    "location-id":"Taipei",
    "location-idtw":"台北",
    "image_url": Lee
  }
]
export default concertsData
