import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'

const EditUser = (props) => {
    if(!localStorage.getItem("userInfo")){
        props.history.push("/")
    }

    const [userData, setUserData] = useState({})
    const [success, setSuccess] = useState(false)
    const {id} = useParams() 

    useEffect(() => {
        axios.get(`/auth/getUserFromAdmin/${id}`,{
            headers: {
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        }).then(user => setUserData(user.data.userInfo))
            .then(setUserData(JSON.stringify(userData)))
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setUserData({...userData, [e.target.name]: e.target.value})
        console.log(userData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`/auth/editUserFromAdmin/${userData._id}`, userData, {
            headers: {
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        })
        setSuccess(true)
    }

    return (
        <div className="container">
            <h3 className="adminPanelTitle">Users</h3>
            <div className="containerAdminTable">
                <table className="adminTable">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Description</th>
                    </tr>
                    {userData ?
                        <tr>
                            <td><input value={userData._id} name="_id" onChange={handleChange}></input></td>
                            <td><input value={userData.name} name="name" onChange={handleChange}></input></td>
                            <td><input value={userData.email} name="email" onChange={handleChange}></input></td>
                            <td><input value={userData.role} name="role" onChange={handleChange}></input></td>
                            <td><input value={"desc---"} name="description" onChange={handleChange}></input></td>
                        </tr>
                        : null
                    }
                </table>
                <button onClick={handleSubmit}>Update</button>
                {success ? <p>User successfully updated</p> : null}
            </div>
        </div>
    )
}

export default EditUser