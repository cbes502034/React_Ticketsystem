import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://reactticketsystem-production.up.railway.app/profile', {
          withCredentials: true 
        })
        if (res.data.status) {
          setUser(res.data.user)
        } else {
          navigate('/auth')
        }
      } catch (error) {
        console.error('取得個人資料失敗:', error)
        navigate('/auth') 
      }
    }

    fetchProfile()
  }, [navigate])

  if (!user) return <div>載入中...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">會員資料</h1>
      <p><strong>帳號：</strong>{user.login_id}</p>
      <p><strong>姓名：</strong>{user.name}</p>
    </div>
  )
}
