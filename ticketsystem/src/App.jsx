import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AuthPage from './pages/Auth'
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
        {/*<Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/concert/:id" element={<Concert />} />*/}
      </Routes>
    </Router>
  )
}
