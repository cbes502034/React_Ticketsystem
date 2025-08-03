import { useState } from 'react'
import NavTabs from '../components/NavTabs'
import Navbar from '../components/Navbar' 
import Login from './Login'
import Register from './Register'

export default function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tab, setTab] = useState('login','register')

  return (
  <div className="pt-20">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <div className="max-w-lg mx-auto bg-white shadow rounded">
        <NavTabs onTabChange={setTab} />
      <div className="p-6">
        {tab === 'login' && <Login setTab={setTab} />} 
        {tab === 'register' && <Register/>}
        {tab === 'forgot' && <p>（尚未實作）</p>}
        {tab === 'update' && <p>（尚未實作）</p>}
      </div>
    </div>
  </div>

  )
}
