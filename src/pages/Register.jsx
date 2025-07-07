import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  {/*登入帳號*/}
  const [loginType, setLoginType] = useState('id') // 預設為身分證
  const [loginValue, setLoginValue] = useState('')
  {/*密碼*/}
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [realName, setRealName] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('密碼與確認密碼不一致')
      return
    }

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        alert('註冊成功，請登入')
        navigate('/login')
      } else {
        const data = await res.json()
        setError(data.message || '註冊失敗')
      }
    } catch (err) {
      setError('伺服器錯誤，請稍後再試')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">註冊帳號</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        {/*輸入帳號 身分證*/}
        <div className="w-full justify-start ">
        <label className="block text-sm font-medium" >*Login ID(帳號):</label>        
        {/* 單選選項 */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="loginType"
            value="id"
            checked={loginType === 'id'}
            onChange={(e) => setLoginType(e.target.value)}
          />
          <span>身分證字號</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="loginType"
            value="passport"
            checked={loginType === 'passport'}
            onChange={(e) => setLoginType(e.target.value)}
          />
          <span>護照或居留證號碼</span>
        </label>
      </div>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded"
        placeholder={loginType === 'id' ? '請輸入身分證字號' : '請輸入護照或居留證號碼'}
        value={loginValue}
        onChange={(e) => setLoginValue(e.target.value)}
        required
      />
        </div>
         {/*輸入密碼*/}
        <div>
          <label className="block text-sm font-medium">*Password(密碼):</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
         {/*密碼確認*/}
        <div>
          <label className="block text-sm font-medium">*Confirm password(確認密碼):</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
          {/*輸入姓名
          <div>
          <label className="block text-sm font-medium">*Name(會員姓名):</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>*/}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          註冊
        </button>
      </form>
    </div>
  )
}
