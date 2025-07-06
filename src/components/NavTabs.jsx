import { useState } from 'react'

export default function NavTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('login')

  const tabs = [
    { key: 'login', label: '會員登入' },
    { key: 'register', label: '加入會員' },
    { key: 'forgot', label: '忘記密碼' },
    { key: 'update', label: '會員資料異動申請' }
  ]

  const handleTabClick = (key) => {
    setActiveTab(key)
    onTabChange && onTabChange(key) // 通知父層切換畫面
  }

  return (
    <div className="flex border-b text-sm font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          className={`px-4 py-2 border-t border-l border-r rounded-t-md ${
            activeTab === tab.key
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
