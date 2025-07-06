import { useState } from 'react'
import NavTabs from '../components/NavTabs'
import Login from './Login'
// 你也可以製作 Register、ForgotPassword 等元件

export default function Auth() {
  const [tab, setTab] = useState('login')

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded">
      <NavTabs onTabChange={setTab} />

      <div className="p-6">
        {tab === 'login' && <Login />}
        {tab === 'register' && <p>這是註冊畫面（尚未實作）</p>}
        {tab === 'forgot' && <p>這是忘記密碼畫面（尚未實作）</p>}
        {tab === 'update' && <p>這是會員資料異動申請畫面（尚未實作）</p>}
      </div>
    </div>
  )
}
