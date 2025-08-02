import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AuthPage from './pages/Auth'
import ConcertList from './pages/ConcertList'
import SearchPage from './pages/SearchPage'
//import Login from './pages/Login'
//import Register from './pages/Register'
//import Concert from './pages/Concert'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/concert-list" element={<ConcertList />} /> {/* ✅ 加上這行 */}
        <Route path="/search" element={<SearchPage />} />

        {/*<Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/concert/:id" element={<Concert />} />*/}
      </Routes>
    </Router>
  )
}
