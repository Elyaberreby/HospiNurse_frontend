import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../image/profile.png'
import { FaHome } from "react-icons/fa";
import './Medicines.css'
import { method_user_api } from '../services/api';

const Medicines = () => {


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
        <div className="container_Medicines">
            <div className="wrapper_Medicines">
                <Link to="/settings" className="imgs">
                    <img src={profile} alt="S-profile" className="S-profile" />
                </Link>
                <Link to="/" className="Back">
                    <FaHome size='2.5rem' color='black' />
                    <br></br>
                    Home
                </Link>
            </div>

            <h2>Medical Help</h2>
            <div className="buttons">
                <div className="main_buttons">
                    <div className="button_one">
                        <button onClick={() => addCall("Getting out of bed")}>Getting out of bed</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("go to the bathroom")}>go to the bathroom</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("go take a shower")}>go take a shower</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("Food")}>Food</button>
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

export default Medicines