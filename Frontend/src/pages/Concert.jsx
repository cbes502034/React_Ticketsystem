// src/pages/ConcertDetail.jsx
import { useParams } from 'react-router-dom'
import concertsData from '../data/concerts'

export default function ConcertDetail() {
  const { id } = useParams()
  const concert = concertsData.find(c => c.id === parseInt(id))

  if (!concert) {
    return <div className="pt-24 text-center text-red-500">找不到演唱會資訊</div>
  }

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto text-brand-text bg-[#F7F3F0] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{concert.name}</h1>
      <img
        src={concert.image_url}
        alt={concert.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <div className="space-y-2 text-[#734338]">
        <p><strong>📅 日期：</strong>{concert.date}</p>
        <p><strong>📍 地點：</strong>{concert.location}</p>
        <p><strong>🎟️ 票價：</strong>{concert.price}</p>
        <p><strong>🔖 別名：</strong>{concert.aliases?.join(', ')}</p>
        <p><strong>📝 活動說明：</strong>{concert.description}</p>
        <p><strong>❗ 注意事項：</strong>{concert.note}</p>
      </div>

      <div className="mt-8">
        <a
          href={`/tickets?concert_id=${concert.id}`}
          className="inline-block bg-[#B19693] hover:bg-[#947A6D] text-white px-6 py-3 rounded text-lg"
        >
          立即購票
        </a>
      </div>
    </div>
  )
}
