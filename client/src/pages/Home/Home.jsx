import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../components/Store/AuthUser'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  const navigate = useNavigate()
  const { user, authCheck, logout } = useAuthStore()
  console.log('user', user);


  useEffect(() => {
    authCheck()
  }, [])


  function handleNavigateRegister() {
    navigate('/register')
  }

  function handlelogin() {
    navigate('/login')
  }

  function handlelogout() {
    logout()
  }

  return (
    <div>
      <Navbar />
      <button onClick={handleNavigateRegister}>signup</button>
      <button onClick={handlelogout}>logout</button>
      <button onClick={handlelogin}>login</button>
      <h1>
        {user ? 'authorized' : 'not authorized'}
      </h1>

    </div>
  )
}

export default Home