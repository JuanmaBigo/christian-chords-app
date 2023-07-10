import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/CC-logo.png'

export default function MainLayout(props) {
    return (
        <div className='main'>
            <img src={logo} />
            <Outlet />
        </div>
    )
}
