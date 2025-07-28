import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Concert() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [concert, setConcert] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/get_ticket_informations?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error('無法取得演唱會資訊')
        return res.json()
      })
      .then(data => setConcert(data))
      .catch(err => setError(err.message))
  }, [id])

  if (error) {
    return <div className="p-6 text-red-600">錯誤：{error}</div>
  }

  if (!concert) {
    return <div className="p-6">載入中...</div>
  }

  const handleSelectTicket = (ticketType) => {
    // 可以改成 navigate 到購票頁，或將票種帶入下一步
    navigate(`/ticket?id=${id}&type=${encodeURIComponent(ticketType)}`)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{concert.name}</h1>
      <img
        src={concert.image_url}
        alt={concert.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-2">📍 地點：{concert.location}</p>
      <p className="text-gray-700 mb-4">📅 日期：{concert.date}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">票種選擇</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {concert.ticket_types.map((ticket, index) => (
          <div
            key={index}
            className="border p-4 rounded hover:shadow cursor-pointer"
            onClick={() => handleSelectTicket(ticket.type)}
          >
            <h3 className="text-lg font-bold">{ticket.type}</h3>
            <p className="text-gray-600">價格：${ticket.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
