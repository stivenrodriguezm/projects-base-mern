import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Admin = () => {

    const [userData, setUserData] = useState(null)

    const editUser = async (e) => {
        e.preventDefault()
        const id = e.target.name
        axios.get(`/getUserFromAdmin/${id}`,{
            headers: {
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        }).then(result => console.log(result.data) /*setUserData(result.data.data)*/)
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
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    {usersData ?
                        (usersData.map((usuario) =>(
                            <tr>
                                <td>{usuario._id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.role}</td>
                                <td>Desc---</td>
                                <td name={usuario._id}>▀</td>
                                <td name={usuario._id}>X</td>
                            </tr>
                        ))
                        ) : (<p>loading...</p>)
                    }
                </table>
            </div>
        </div>
    )
}