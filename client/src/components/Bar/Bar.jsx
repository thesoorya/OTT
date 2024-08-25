import React from 'react'
import './Bar.css'
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Bar = () => {

    return (
        <div className='bar'>
            <h1>
                <Link to='/'><IoIosArrowBack /></Link>
            </h1>
        </div>
    )
}

export default Bar