import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App