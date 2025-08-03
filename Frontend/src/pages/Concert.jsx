import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import concertsData from '../data/concerts'
import image from '../assets/image'


export default function Concert() {
  const { id } = useParams()
  const concert = concertsData.find(c => c.id.toString() === id)

  if (!concert) {
    return <div className="p-6">找不到演唱會資訊</div>
  }

  const dateObj = new Date(concert.date)
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' })
  const day = dateObj.getDate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
  fetch('https://reactticketsystem-production.up.railway.app/check_login', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => setIsLoggedIn(data.logged_in || false))
    .catch(() => setIsLoggedIn(false))
}, [])

  return (
    <div className="pt-20 bg-black text-white min-h-screen">

    <div className=" p-9 relative">
        <img src={concert.image_url} alt={concert.name} className="w-full h-[600px] object-contain" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
          <h1 className="text-3xl font-bold mb-2">{concert.name}</h1>
          <p className="text-gray-200 font-semibold">{weekday}, {day} {month.toUpperCase()} {dateObj.getFullYear()}</p>
          <p className="mt-1 flex items-center gap-x-1">
            <img src={image.locationw} alt="location" className="w-5 h-5 " />
            {concert.location}</p>
          <p className="mt-1 flex items-center gap-x-1">
            <img src={image.clock} alt="clock" className="bg-white w-5 h-5 " />
            {concert.time}</p>
        </div>
      </div>
    <div className="bg-gray-100 text-black rounded-lg shadow-md mx-6 mb-10 p-6 space-y-6">

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Tickets</h2>
        <div className="bg-white text-black rounded shadow p-4 flex items-center justify-between">
          <p className="p-2 font-semibold">General Onsale</p>
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate(`/ticket/${concert.id}`)
              } else {
                navigate(`/auth?redirect=/ticket/${concert.id}`)
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Buy tickets ↗
          </button>
        </div>
      </div>

      {concert.alt_dates?.length > 0 && (
      <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Alternative Dates</h3>
          <div className="flex gap-4">
            {concert.alt_dates.map((d, index) => {
              const altDate = new Date(d.date)
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-300 p-4 rounded-md text-center w-28 shadow"
                >
                  <p className="text-sm font-bold text-gray-500">{altDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
                  <p className="text-2xl font-bold text-black">{altDate.getDate()}</p>
                  <p className="text-sm uppercase text-gray-600">{altDate.toLocaleDateString('en-US', { month: 'short' })}</p>
                  <p className="text-xs text-gray-500 mt-1">{d.city}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
   </div>

    <div className="bg-gray-300 text-black rounded-lg shadow-md mx-6 mb-10 p-6 space-y-6">
        {concert.info?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2">注意事項</h3>
            <h4 className="font-semibold text-sm mb-2">票卷使用規範:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {concert.info.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
