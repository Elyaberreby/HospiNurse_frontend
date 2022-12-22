import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import profile from '../image/profile.png'
import { FaHome } from "react-icons/fa";
import './Callspatient.css'
import { method_user_api } from '../services/api';
import { useEffect } from 'react';

const Callspatient = () => {
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const user = await method_user_api("/users/verify", "POST", {});
            setCalls(user?.data?.calls);
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
                getUser();
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container_Callspatient">
            <div className="wrapper_Callspatient">

                <Link to="/settings" className="imgs">
                    <img src={profile} alt="S-profile" className="S-profile" />
                </Link>
                <Link to="/" className="Back">
                    <FaHome size='2.5rem' color='black' />
                    <br></br>
                    Home
                </Link>

            </div>
            <h2>My Calls</h2>
            {
                calls && calls?.map((call, i) => {
                    return call?.title && (
                        <div key={i} className="button_onee">
                            {call?.title}
                            <button onClick={() => deleteCall(call?.callId)}>X</button>
                        </div>

                    )
                })
            }
        </div>


    )
}

export default Callspatient