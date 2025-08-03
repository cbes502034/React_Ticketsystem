import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import concertsData from '../data/concerts'

function getWeekdayAbbr(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
}

function getMonthAbbr(date) {
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function getMonthYearKey(dateStr) {
  const date = new Date(dateStr)
  return `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`
}

export default function ConcertList() {
  const [concerts, setConcerts] = useState([])

  useEffect(() => {
    setConcerts(concertsData)
  }, [])

  const groupedConcerts = concerts.reduce((acc, concert) => {
    const key = getMonthYearKey(concert.date)
    acc[key] = acc[key] || []
    acc[key].push(concert)
    return acc
  }, {})

    return (
    <div className="pt-24 px-4 bg-brand-bg min-h-screen">
      {Object.entries(groupedConcerts)
        .sort(([a], [b]) => {
          const dateA = new Date(Date.parse(`1 ${a}`))  
          const dateB = new Date(Date.parse(`1 ${b}`))
          return dateA - dateB
        })
        .map(([month, concertsInMonth]) => (
          <div key={month} className="space-y-4 mb-8">
            <h2 className="text-xl font-bold">{month}</h2>
            {concertsInMonth.map(concert => {
              const dateObj = new Date(concert.date)
              return (
                <div key={concert.id} className="flex items-center bg-white rounded-lg shadow p-4">
                  <div className="text-center w-16 shrink-0 text-[#734338]">
                    <div className="text-xs font-bold">{getWeekdayAbbr(dateObj)}</div>
                    <div className="text-2xl font-bold">{dateObj.getDate()}</div>
                    <div className="text-xs uppercase">{getMonthAbbr(dateObj)}</div>
                  </div>
                  <div className="flex items-center flex-1 gap-4 px-4">
                    <img src={concert.image_url} alt={concert.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="text-lg font-bold">{concert.name}</h3>
                      <p className="text-sm text-gray-500">{concert.aliases?.[0] || ''}</p>
                      <p className="text-sm text-gray-600">{concert.location}</p>
                    </div>
                  </div>
                  <Link
                    to={`/concert/${concert.id}`}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    MORE INFO
                  </Link>
                </div>
              )
            })}
          </div>
        ))}
    </div>
  )

}
