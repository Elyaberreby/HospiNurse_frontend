import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../image/profile.png'
import { FaHome } from "react-icons/fa";
import './Pain.css'
import { method_user_api } from '../services/api';

const Pain = () => {
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
    <div className="container_Pain">
            <div className="wrapper_Pain">
                <Link to="/settings" className="imgs">
                    <img src={profile} alt="S-profile" className="S-profile" />
                </Link>
                <Link to="/" className="Back">
                    <FaHome size='2.5rem' color='black' />
                    <br></br>
                    Home
                </Link>
            </div>

            <h2>Pain Relief</h2>
            <div className="buttons">
                <div className="main_buttons">
                    <div className="button_one">
                        <button onClick={() => addCall("Pill for headaches")}>Pill for headaches</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("Painkiller pill")}>Painkiller pill</button>
                    </div>
                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("A pill for nutritional supplements")}>A pill for nutritional supplements</button>
                    </div>

                    <br></br>
                    <div className="button_one">
                        <button onClick={() => addCall("anti fever pill")}>anti fever pill</button>
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

export default Pain