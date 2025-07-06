import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/check_login', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.logged_in || false))
      .catch(err => {
        console.error('檢查登入狀態失敗：', err)
        setIsLoggedIn(false)
      })
  }, [])

  const handleLogout = async () => {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setIsLoggedIn(false)
    navigate('/Auth')
  }

  return (
    <nav className="bg-brand-nav px-6 py-4 flex justify-between items-center shadow"
         >
      <Link to="/" className="text-2xl font-bold hover:text-brand-hover transition-colors">
        🎵 演唱會系統
      </Link>
      <div className="flex gap-4 items-center text-lg">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="hover:text-brand-hover transition-colors">會員中心</Link>
            <button
              onClick={handleLogout}
              className="hover:text-brand-hover transition-colors focus:outline-none"
            >
              登出
            </button>
          </>
        ) : (
          <>
            <Link to="/Auth" className="hover:text-brand-hover transition-colors">登入</Link>
            <Link to="/register" className="hover:text-brand-hover transition-colors">註冊</Link>
          </>
        )}
      </div>
    </nav>
  )
}
