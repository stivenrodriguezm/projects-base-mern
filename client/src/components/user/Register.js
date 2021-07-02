import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = (props) => {
    if(localStorage.getItem("userInfo")){
        props.history.push("/")
    }

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        error: null
    })

    const { name, email, password, error} = data

    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setData({...data,error:null})
            await axios.post("/auth/register", {name, email, password}, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            props.history.push("/login")
        } catch (err) {
            setData({...data, error: err.response.data.error})

        }
    }

    return (
        <div className="register container">
            <h4>Register form</h4>
            <form id="registerForm">
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" className="registerInput" onChange={handleChange}></input>

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" className="registerInput" onChange={handleChange}></input>
                
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" className="registerInput" onChange={handleChange}></input>

                <button onClick={handleSubmit}>Register now</button>
                {data.error ? <p>{data.error}</p>:null}
            </form>
            <p>Already registered? <Link to="/login">Login now</Link></p>
        </div>
    )
}

export default Register
