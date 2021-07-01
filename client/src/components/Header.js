import React from 'react'
import { Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const Header = (props) => {
    const token = localStorage.getItem('token')
    var decodedToken=jwt.decode(token, {complete: true})
    var dateNow = new Date();

    const logout = async () => {
        await localStorage.removeItem('token')
        await localStorage.removeItem('userInfo')
        window.location.reload()
    }

    return (
        <header>
            <nav id="header">
                <div className="header-left">
                    <Link to="/">Index</Link>
                </div>
                <div className="header-center">

                </div>
                <div className="header-right">
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <Link to="/profile"> Profile</Link>) : <div></div>}
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <Link onClick={logout}>Logout</Link>) : <div></div>}
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <div></div>) : <Link to="/register">Register</Link>}
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <div></div>) : <Link to="/login">Login</Link>}
                </div>
            </nav>
        </header>
    )
}

export default Header
