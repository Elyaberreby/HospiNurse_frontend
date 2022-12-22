import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NurseCalls.css'
import profile from '../image/profile.png'
import { method_user_api } from '../services/api'
import { useEffect } from 'react'


const NurseCalls = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const users = await method_user_api("/users", "GET");
            setAllUsers(users);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteCall = async (id) => {
        try {
            const del = await method_user_api("/users/deletecall/" + id, "PUT", {});
            if (del?.modifiedCount === 1) {
                alert("Call removed");
               getAllUsers();
            }

        }
        catch (err) {
            console.log(err);
        }
    }




    return (
        <div className="container_NurseCalls">
            <div className="wrapper_NurseCalls">

                <Link to="/settings" className="imgs">
                    <img src={profile} alt="S-profile" className="S-profile" />
                </Link>
                <h2>My Calls</h2>

            </div>

            {
                    allUsers && allUsers?.map((user, i) => {
                        return user?.calls && user?.calls?.map((call, j) => {
                            return call && (
                                <div key={j}>
                                <p>{user?.name} (room number : {user?.room})  : 
                                    {call?.title} <button onClick={() => deleteCall(call?.callId)}>  x</button></p>
                              
                                </div>
                            )
                        })
                    })
                }
  
        </div>

    )
}

export default NurseCalls