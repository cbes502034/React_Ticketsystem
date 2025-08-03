import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserProfile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get('https://reactticketsystem-production.up.railway.app/profile')
      .then(res => {
        if (res.data.status) {
          setUser(res.data.user)
        } else {
          alert(res.data.notify)
          window.location.href = 'https://reactticketsystem-production.up.railway.app/Auth/Login'
        }
      })
      .catch(err => {
        console.error(err)
        alert("無法取得使用者資料")
      })
  }, [])

  if (!user) return <div>載入中...</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">會員資料</h2>
      <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
        <p><strong>帳號：</strong> {user.login_id}</p>
        <p><strong>姓名：</strong> {user.name}</p>
        <p><strong>會員編號：</strong> {user.register_id}</p>
        {/* 你可以加入 email / phone / address 等欄位 */}
      </div>
    </div>
  )
}
