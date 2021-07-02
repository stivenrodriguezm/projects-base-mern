import React from 'react'
import { Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'

const Footer = (props) => {

    const token = localStorage.getItem('token')
    var decodedToken=jwt.decode(token, {complete: true})
    var dateNow = new Date()

    return (
        <footer>
            <div className="footer-left">
                <h4>Links</h4>
                <nav>
                    <Link to="/">Index</Link>
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <Link to="/profile"> Profile</Link>) : <div></div>}
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <div></div>) : <div><Link to="/register">Register</Link><br/></div>}
                    {token ? (decodedToken.exp < dateNow.getTime() ? <div></div> : <div></div>) : <div><Link to="/login">Login</Link><br/></div>}
                </nav>
            </div>
            <div className="footer-rigth">
                <h4>Footer continuation</h4>
                <div className="listaFooter">
                    <ul>
                        <li>Links of interes</li>
                        <li>Whatever else</li>
                        <li>Whatever else else</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <h4>All rights reserved</h4>
            </div>
        </footer>
    )
}

export default Footer
