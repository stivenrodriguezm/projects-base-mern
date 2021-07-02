import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const Register = (props) => {
    if(localStorage.getItem("userInfo")){
        props.history.push("/")
    }

    const [data, setData] = useState({
        email: '',
        password: '',
        error: null
    })
    const {email, password, error} = data

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setData({...data,error:null})
            const res = await axios.post("/auth/login", {email, password}, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            await localStorage.setItem('token', res.data.token)
            
            const userInfo = await axios.get("/auth/data",{
                headers: {
                    'Authorization': `bearer ${localStorage.getItem("token")}`
                }
            })
            await localStorage.setItem('userInfo', JSON.stringify(userInfo.data.userInfo))

            window.location.reload()
            props.history.push("/")
        } catch (err) {
            setData({...data, error: err.response.data.message})
        }
    }

    const token = localStorage.getItem('token')
   // var decodedToken=jwt.decode(token, {complete: true});
    //var dateNow = new Date();

    return (
        <div className="register container">
            { token
                ? (<p>Already logged in</p>)
                : (
                <div>
                    <h4>Login form</h4>
                    <form id="registerForm">
                        <label htmlFor="email">Email:</label>
                        <input 
                            value={data.email}
                            name="email"
                            type="email" 
                            id="email" 
                            className="registerInput" 
                            onChange={handleChange}>
                        </input>
                        
                        <label htmlFor="password">Password:</label>
                        <input 
                            name="password"
                            value={data.password}
                            type="password" 
                            id="password" 
                            className="registerInput" 
                            onChange={handleChange}>
                        </input>

                        <button onClick={handleSubmit}>Log in</button>
                        {data.error ? <p>{data.error}</p> : null}
                    </form>
                    <p>Not an user? <Link to="/register">Register now</Link></p>
                </div>
                )
            }
        </div>
    )
}

export default Register
