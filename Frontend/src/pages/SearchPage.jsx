import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import concertsData from '../concerts.json' // 請根據你實際的路徑調整

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[\u3000]/g, '')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
}

export default function SearchPage() {
  const location = useLocation()
  const [results, setResults] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const rawKeyword = searchParams.get('keyword') || ''
    setKeyword(rawKeyword)

    const keywordNorm = normalize(rawKeyword)

    const filtered = concertsData.filter(c => {
      const normName = normalize(c.name)
      const normLocation = normalize(c.location)
      const normAliases = (c.aliases || []).map(normalize)

      return (
        normName.includes(keywordNorm) ||
        normLocation.includes(keywordNorm) ||
        normAliases.some(alias => alias.includes(keywordNorm))
      )
    })

    setResults(filtered)
  }, [location.search])

  return (
    <div className="pt-20 p-6 bg-brand-bg min-h-screen text-brand-text">
      <h1 className="text-2xl font-bold mb-4">搜尋結果：{keyword}</h1>
      
      {results.length === 0 ? (
        <p className="text-brand-text/70">找不到符合「{keyword}」的演唱會</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map(concert => (
            <div key={concert.id} className="bg-white rounded-lg shadow-md overflow-hidden card">
              <img
                src={concert.image_url}
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
                  style={{ backgroundColor: '#B19693' }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#947A6D'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#B19693'}
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
