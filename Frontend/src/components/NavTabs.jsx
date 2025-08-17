import { useState } from 'react'
import tabData from '../data/navTabs.json' 

export default function NavTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('login')

  const handleTabClick = (key) => {
    setActiveTab(key)
    onTabChange && onTabChange(key) 
  }

  return (
<div className="flex border-b text-sm font-medium">
{tabData.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          className={`flex-1 text-center px-4 py-2 border-t border-l border-r rounded-t-md ${
            activeTab === tab.key
              ? 'bg-[#734338] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
