import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [concerts, setConcerts] = useState([])

  useEffect(() => {
    fetch('/get_hot_concerts')
      .then(res => res.json())
      .then(data => setConcerts(data))
      .catch(err => console.error('載入熱門演唱會失敗:', err))
  }, [])

  return (
    <div className="pt-20 p-6 bg-brand-bg min-h-screen text-brand-text">
      <h1 className="text-3xl font-bold mb-6 text-brand-text"> 熱門演唱會</h1>

      {concerts.length === 0 ? (
        <p className="text-brand-text/70">目前沒有熱門演唱會資料</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {concerts.map(concert => (
            <div key={concert.id} className="bg-white rounded-lg shadow-md overflow-hidden card">
              <img
                src={concert.image_url || '/default.jpg'}
                alt={concert.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-brand-bg">{concert.name}</h2>
                <p className="text-brand-bg/80">{concert.date}</p>
                <p className="text-brand-bg/70">{concert.location}</p>
                <Link
                  to={`/concert/${concert.id}`}
                  className="inline-block mt-4 px-4 py-2 rounded text-white font-semibold"
                  style={{
                    backgroundColor: '#B19693',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#947A6D'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#B19693'
                  }}
                >
                  查看詳情
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
