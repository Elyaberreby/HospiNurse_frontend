import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../image/profile.png'
import { FaHome } from "react-icons/fa";
import './GeneralHelp.css'
import { method_user_api } from '../services/api';

const GeneralHelp = () => {


    const addCall = async (title) => {
        try {
            const call = await method_user_api("/users/addcall", "PUT", { title });
            if (call?.modifiedCount === 1) {
                alert("Call added");
            }

        }
        catch (err) {
            //404-עמודה שלא נמצא 
            console.log(err);

        }

    }


    return (
        <div className="container_GeneralHelp">
            <div className="wrapper_GeneralHelp">
                <Link to="/settings" className="imgs">
                    <img src={profile} alt="S-profile" className="S-profile" />
                </Link>
                <Link to="/" className="Back">
                    <FaHome size='2.5rem' color='black' />
                    <br></br>
                    Home
                </Link>
            </div>

            <h2>General Help</h2>
            <div className="buttons">
                <div className="main_buttons">
                    <div className="button_one">
                        <button onClick={() => addCall("Help getting out of bed")}>Help getting out of bed</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("Not feeling wel")}>Not feeling wel</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("Disconect from trasfusion")}>Disconect from trasfusion</button>
                    </div>

                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("Meal after surgery")}>Meal after surgery</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("other")}>other</button>
                    </div>

                </div>
            </div>

        </div>


    )
}

export default GeneralHelp