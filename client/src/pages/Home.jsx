import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='home-container'>
            <h1>Christian Chords</h1>
            <Link to="/songs" className='button-explore'>Ir a explorar canciones</Link>
        </div>
    )
}
