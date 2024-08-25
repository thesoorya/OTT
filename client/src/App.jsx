import React from 'react'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home/Home'
import Bar from './components/Bar/Bar'
import Navbar from './components/Navbar/Navbar'
import AuthPage from './pages/AuthPage/AuthPage'

const App = () => {

  const location = useLocation()
  const user = false

  return (
    <div className='app'>
      {(location.pathname === '/login' || location.pathname === '/register') ? <Bar /> : <Navbar />}
      <Routes>
        <Route path='/' element={user ? <Home /> : <AuthPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
