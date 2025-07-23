import { useLocation } from 'react-router-dom'
import concertsData from '../data/concerts.json'

export default function SearchPage() {
  const query = new URLSearchParams(useLocation().search)
  const keyword = query.get('keyword')?.toLowerCase() || ''

  const results = concertsData.filter(c =>
    c.name.toLowerCase().includes(keyword) ||
    c.location.toLowerCase().includes(keyword)
  )

  return (
    <div className="pt-20 p-6 bg-brand-bg min-h-screen text-brand-text">
      <h1 className="text-2xl font-bold mb-4">搜尋結果：{keyword}</h1>
      {results.length === 0 ? (
        <p>找不到相關的演唱會。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((concert) => (
            <div key={concert.id} className="bg-white rounded shadow p-4">
              <img src={concert.image_url} alt={concert.name} className="h-40 w-full object-cover rounded" />
              <h2 className="mt-2 text-xl font-semibold">{concert.name}</h2>
              <p>{concert.date}</p>
              <p>{concert.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
