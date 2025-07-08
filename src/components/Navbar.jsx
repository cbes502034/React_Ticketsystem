import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import image from '../assets/image'


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    fetch('/check_login', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.logged_in || false))
      .catch(() => setIsLoggedIn(false))
  }, [])

  useEffect(() => {
    setIsMenuOpen(false) 
  }, [location])

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/shopping-cart')
    } else {
      navigate('/auth')
    }
  }  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#D7C4BB] px-6 py-3 flex justify-between items-center shadow">
      {/* 左側 Logo 與標題 */}
      <Link to="/" className="text-xl font-bold text-[#734338]">演唱會系統</Link>

      {/* 中間連結（桌機顯示） */}
      <div className="hidden md:flex gap-6 text-[#734338] font-medium">
        <Link to="/concerts" className="hover:text-[#947A6D]">演唱會資訊</Link>
        <Link to="/tickets" className="hover:text-[#947A6D]">購票資訊</Link>
      </div>

      {/* 右側圖示按鈕 */}
      <div className="flex items-center gap-4">
        <Link to={isLoggedIn ? "/profile" : "/auth"}>
          <img src={image.account} alt="Account" className="w-6 h-6 hover:opacity-80" />
        </Link>
        <button onClick={handleCartClick}>
          <img src={image.cart} alt="Cart" className="w-6 h-6 hover:opacity-80" />
        </button>

        {/* 手機收合選單按鈕 */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={image.right} alt="Menu" className="w-6 h-6" />
        </button>
      </div>

      {/* 手機選單 */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[50px] z-50 bg-white p-6 md:hidden overflow-y-auto">
          <div className="space-y-4">

            <Link to="/concerts" className="block px-4 py-2 text-[#734338] hover:bg-[#D7C4BB]">演唱會資訊</Link>
            <Link to="/tickets" className="block px-4 py-2 text-[#734338] hover:bg-[#D7C4BB]">購票資訊</Link>

          </div>
        </div>
      )}

    </nav>
  )
}
