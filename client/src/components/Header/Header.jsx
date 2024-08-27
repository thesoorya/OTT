import React from 'react'
import './Header.css'
import { useAuthStore } from '../Store/AuthUser'

const Header = () => {

    const { user } = useAuthStore()

    return (
        <div className='header'>
            <h1>Welcome, {user ? user.username : 'Guest'}!</h1>
            <p>
                {user ? `We're glad to have you back at WIZARD, ${user.username}!` : 'Welcome to WIZARD, your one-stop shop for all your needs. Sign up or log in to start shopping!'}
            </p>
        </div>
    )
}

export default Header
