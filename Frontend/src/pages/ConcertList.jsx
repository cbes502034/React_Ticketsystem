import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ConcertList() {
  const [concerts, setConcerts] = useState([])

  useEffect(() => {
    fetch('/data/concerts.json')  
      .then(res => res.json())
      .then(data => setConcerts(data))
      .catch(err => console.error('無法載入演唱會資訊:', err))
  }, [])

  return (
    <div className="pt-20 px-6 min-h-screen bg-[#F7F3F0] text-brand-text">
      <h1 className="text-3xl font-bold mb-6 text-center">🎤 演唱會資訊</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {concerts.map(concert => (
          <div key={concert.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={concert.image}
              alt={concert.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#734338]">{concert.name}</h2>
              <p className="text-[#734338]/80">📅 {concert.date}</p>
              <p className="text-[#734338]/70">📍 {concert.location}</p>
              <Link
                to={`/concert/${concert.id}`}
                className="inline-block mt-4 px-4 py-2 bg-[#B19693] text-white rounded hover:bg-[#947A6D]"
              >
                查看詳情
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
