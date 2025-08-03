import { useEffect, useState } from 'react'
import image from '../assets/image'

const areaMap = {
  'rock-left': '搖滾區左',
  'rock-center': '搖滾區中',
  'rock-right': '搖滾區右',
  'a-area': 'A區',
  'b-area': 'B區',
  'c-area': 'C區',
  'd-area': 'D區'
}

const seatConfig = [
  { id: 'rock-left', rows: 5, cols: 10 },
  { id: 'rock-center', rows: 5, cols: 20},
  { id: 'rock-right', rows: 5, cols: 10},
  { id: 'b-area', rows: 20, cols: 10, className: 'bg-orange-400' },
  { id: 'a-area', rows: 20, cols: 20, className: 'bg-yellow-300' },
  { id: 'c-area', rows: 20, cols: 10, className: 'bg-orange-400' },
  { id: 'd-area', rows: 10, cols: 20, className: 'bg-pink-300' }
]

export default function Ticket() {
  const [selected, setSelected] = useState(null)
  const [eventTitle, setEventTitle] = useState('STAGE')
  const [eventID, setEventID] = useState(null)
  const [purchased, setPurchased] = useState([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const title = decodeURIComponent(params.get('title') || 'STAGE')
    setEventTitle(title)

    const fetchSeats = async () => {
      const res = await fetch('https://reactticketsystem-production.up.railway.app/ticket/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      const data = await res.json()
      setEventID(data.event_id)
      setPurchased(data.purchased || [])
    }

    fetchSeats()
  }, [])

  const handleSelect = (seat) => {
    if (seat.disabled) return
    setSelected(seat)
  }

  const handleSubmit = () => {
    if (!selected) return alert('請先選擇一個座位')
    setShowConfirm(true)
  }

  const confirmSubmit = async () => {
    const payload = {
      area: areaMap[selected.area] || selected.area,
      row: selected.row,
      column: selected.col,
      totpcode_input: verifyCode,
      event_id: eventID
    }

    const res = await fetch('https://reactticketsystem-production.up.railway.app/ticket', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const data = await res.json()

    if (data.status) {
      alert('購票成功')
      setShowVerify(false)
    } else {
      alert(data.notify)
    }
  }

  const isDisabled = (area, row, col) => {
    return purchased.some(
      ([dbArea, dbRow, dbCol]) =>
        dbArea === areaMap[area] && dbRow === row && dbCol === col
    )
  }

  const renderSection = (id) => {
    const config = seatConfig.find((s) => s.id === id)
    if (!config) return null

    return (
      <div key={id} className="flex flex-col gap-[2px]">
        {[...Array(config.rows)].map((_, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-[2px]">
            {[...Array(config.cols)].map((_, colIdx) => {
              const row = rowIdx + 1
              const col = colIdx + 1
              const isUsed = isDisabled(id, row, col)
              const isSel =
                selected &&
                selected.area === id &&
                selected.row === row &&
                selected.col === col
              return (
                <button
                  key={colIdx}
                  disabled={isUsed}
                  onClick={() => handleSelect({ area: id, row, col, disabled: isUsed })}
                  className={`w-6 h-6 rounded p-0 m-[1px] flex items-center justify-center
                    ${isUsed ? 'bg-red-500 cursor-not-allowed' : isSel ? 'bg-blue-600' : 'bg-gray-200 hover:bg-blue-100 active:bg-blue-300'}`}
                >
                  <img src={image.chair} alt="chair" className="w-4 h-4" />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-20 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{eventTitle}</h1>
      <div className="bg-black text-white w-[760px] mx-auto py-2 font-bold mb-6">- - - - - - - -</div>

      {/* 上層：搖滾區 */}
      <div className="flex justify-center gap-8 mb-2 bg-red-500">
        {['rock-left', 'rock-center', 'rock-right'].map((id) => renderSection(id))}
      </div>

      {/* 中層：B A C 區 */}
      <div className="flex justify-center gap-8 mb-2 bg-orange-400">
        {['b-area', 'a-area', 'c-area'].map((id) => renderSection(id))}
      </div>

      {/* 下層：D 區置中 */}
      <div className="flex justify-center bg-yellow-300 bg-contain">
        {renderSection('d-area')}
      </div>

      <p className="mt-4 font-semibold text-red-600">
        {selected
          ? `${areaMap[selected.area]} ${selected.row}排 ${selected.col}位`
          : '尚未選擇任何座位'}
      </p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        確定
      </button>

      {showConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow">
            <p className="font-bold">請確認您的訂票內容：</p>
            <table className="my-4 text-left">
              <tbody>
                <tr>
                  <td className="pr-2">演唱會場次：</td>
                  <td>{eventTitle}</td>
                </tr>
                <tr>
                  <td className="pr-2">區域：</td>
                  <td>{areaMap[selected.area]}</td>
                </tr>
                <tr>
                  <td className="pr-2">位置：</td>
                  <td>{selected.row}排{selected.col}位</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => setShowVerify(true)}
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              確定
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {showVerify && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="font-bold mb-2">請輸入驗證碼：</p>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="border p-2 rounded w-48"
            />
            <div className="mt-4">
              <button
                onClick={confirmSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                確認送出
              </button>
              <button
                onClick={() => setShowVerify(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
