import React, { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../components/Store/AuthUser'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  const navigate = useNavigate()
  const { user, authCheck } = useAuthStore()
  console.log('user', user);


  useEffect(() => {
    authCheck()
  }, [])

  return (
    <div>
      <Navbar />
      <h1>
        {user ? 'authorized' : 'not authorized'}
      </h1>

    </div>
  )
}

export default Home