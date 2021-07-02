import React, {useState} from 'react'
import axios from 'axios'

const EditProfile = (props) => {
    if(!localStorage.getItem("userInfo")){
        props.history.push("/")
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        id: JSON.parse(localStorage.getItem("userInfo"))._id,
        name: userInfo.name,
        email: userInfo.email,
        description: userInfo.description
    })

    const handleChange = (e) => {
        e.preventDefault()
        setData({...data, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async (e) => {
        const updatedUser = await axios.put("/auth/edit", data,{
            headers: {
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        })
        localStorage.removeItem("userInfo")
        localStorage.setItem("userInfo", JSON.stringify(updatedUser.data))
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setData({
            id: JSON.parse(localStorage.getItem("userInfo"))._id,
            name: userInfo.name,
            email: userInfo.email,
            description: userInfo.description
        })
        setSuccess(true)
    }

    return (
        <div className="container">
            <h2>Edit Profile</h2>
            <div className="editProfileContainer">
                <label htmlFor="nameEdit">Name:</label>
                <input name="name" id="nameEdit"  value={data.name} onChange={handleChange}></input>
                
                <label htmlFor="emailEdit">Email:</label>
                <input name="email" id="emailEdit" type="email" value={data.email} onChange={handleChange}></input>

                <label htmlFor="biography">Biography:</label>
                <textarea value={data.description} id="biography" name="description" onChange={handleChange}></textarea>

                <button className="btn-editProfile" onClick={handleSubmit}>Actualizar informacion</button>
                {success 
                    ? <p>Usuario actualizado exitosamente</p>
                    : null
                }
            </div>
        </div>
    )
}

export default EditProfile
