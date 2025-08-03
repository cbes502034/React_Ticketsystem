import { useEffect, useState } from 'react'

export default function Ticket({ eventId, userId, totpSecret }) {
  const [seats, setSeats] = useState([])
  const [purchased, setPurchased] = useState([])
  const [selected, setSelected] = useState([])

  // ⚡ 一開始就取得座位資料與使用者已購票資訊
  useEffect(() => {
    const fetchData = async () => {
      const otp = prompt('請輸入 TOTP 驗證碼')

      // 1️⃣ 取得所有座位（含售出者）
      const ticketRes = await axios.post('https://reactticketsystem-production.up.railway.app/ticket/data', {
        data: {
          event_id: eventId,
          secret: totpSecret,
          otp: otp,
        },
      })

      if (!ticketRes.data.status) {
        alert(ticketRes.data.notify)
        return
      }
      setSeats(ticketRes.data.tickets)

      // 2️⃣ 查詢目前使用者已購票的座位
      const checkRes = await axios.post('/ticket/check', {
        data: {
          event_id: eventId,
          user_id: userId,
        },
      })

      if (checkRes.data.status) {
        const purchasedSeats = checkRes.data.purchased.map(p => p.seat)
        setPurchased(purchasedSeats)
      }
    }

    fetchData()
  }, [eventId, userId, totpSecret])

  // ✅ 選取/取消座位
  const toggleSelect = (seatId) => {
    if (selected.includes(seatId)) {
      setSelected(prev => prev.filter(id => id !== seatId))
    } else {
      setSelected(prev => [...prev, seatId])
    }
  }

  // 🧾 提交購票請求（此處你還沒提供 /ticket/purchase API，所以先留空）
  const handleSubmit = async () => {
    alert(`你選擇了 ${selected.length} 張座位：${selected.join(', ')}`)
    // 可接入購票 API：
    // await axios.post('/ticket/purchase', { data: { ... } })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">選擇你的座位</h1>

      <div className="grid grid-cols-15 gap-2">
        {seats.map((seat) => {
          const isSold = seat.status === 'sold'
          const isMine = purchased.includes(seat.seat)
          const isSelected = selected.includes(seat.id)

          return (
            <button
              key={seat.id}
              disabled={isSold || isMine}
              onClick={() => toggleSelect(seat.id)}
              className={`
                w-10 h-10 rounded text-xs font-bold
                flex items-center justify-center
                ${isSold ? 'bg-red-500 text-white cursor-not-allowed' : ''}
                ${isMine ? 'bg-gray-400 text-white cursor-not-allowed' : ''}
                ${isSelected ? 'bg-blue-600 text-white' : ''}
                ${!isSold && !isMine && !isSelected ? 'bg-gray-200 hover:bg-blue-100 active:bg-blue-300' : ''}
              `}
            >
              {seat.seat}
            </button>
          )
        })}
      </div>

      <button
        disabled={selected.length === 0}
        onClick={handleSubmit}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        確認購票 ({selected.length} 張)
      </button>
    </div>
  )
}
