import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 呼叫 /login API
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow border border-gray-300">
      <h2 className="text-xl font-bold text-center mb-6">請先登入會員方可購票及使用會員服務</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
        <div className="flex items-center">
          <label className="w-20 text-red-600 font-bold">＊帳號：</label>
          <input
            type="text"
            placeholder="身分證字號、護照或台灣通行證號碼"
            className="flex-1 border px-3 py-2 rounded border-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center">
          <label className="w-20 text-red-600 font-bold">＊密碼：</label>
          <input
            type="password"
            className="flex-1 border px-3 py-2 rounded border-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* <div className="flex items-center">
          <label className="w-20">驗證碼：</label>
          <input
            type="text"
            className="w-28 border px-3 py-2 rounded border-gray-400"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
          <img
            src="/captcha.jpg"
            alt="驗證碼"
            className="ml-3 h-10 w-24 object-contain border"
          />
          <button type="button" className="ml-2 text-gray-500 hover:text-black">
            🔄
          </button>
        </div>*/}

        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <a href="#" className="flex items-center gap-1 hover:text-gray-900">
            ❓ 忘記密碼
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-gray-900">
            ➕ 加入會員
          </a>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="reset"
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          >
            重設
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            送出
          </button>
        </div>
      </form>
    </div>
  )
}
