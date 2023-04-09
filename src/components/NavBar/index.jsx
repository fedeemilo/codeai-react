import React from 'react'
import './navbar.css'

import botImg from '../../assets/bot.svg'

function NavBar() {
    return (
        <nav className="nav">
            <img src={botImg} alt="" />
            <h3>Codeai</h3>
        </nav>
    )
}

export default NavBar
