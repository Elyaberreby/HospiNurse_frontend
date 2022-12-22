import React from 'react'
import { Link } from 'react-router-dom'
import './Info.css'
import profile from '../image/profile.png'
import HospiNurse from '../image/HospiNurse.jpg'
import computer from '../image/computer.jpg'
import { FaHome } from "react-icons/fa";

const Info = () => {
    return (
        <div className="container_Info">
            <div className="wrapper_Info">

                <Link to="/settings" className="imgs">
                    <img src={profile} alt="S-profile" className="S-profile" />
                </Link>
                <Link to="/" className="Back">
                    <FaHome size='2.5rem' color='black' />
                    <br></br>
                    Home
                </Link>
            </div>
            <div className="main_info">
            <h3 className="h3">Hospi Nurse
                <h1 className="title_one">The Hospi Nurse system
                    <br></br>
                    facilitates direct communication
                    <br></br>
                    between the patient and their
                    <br></br>
                    care team
                    <br></br>
                    The system sends specified
                    <br></br>
                    requests that are triaged and
                    <br></br>
                    delegated to the appropriate
                    <br></br>
                    care team member</h1>
                <br></br>
            </h3>
            <img src={HospiNurse} alt="HospiNurse" className="HospiNurse" />

            <h1 className="h1">The Problem</h1>
            <div className="problem">
                Many calls remain active for an excessive amount of time and  <br></br> when answered,
                nurses have to walk back and forth many times <br></br> to bring the supplies and devices
                needed to provide care
                
              

                <h2 className="h2">Management System</h2>         
                <p>The system oversees the department requests and tracks activity.
                    The system prioritizes the requests based on urgency and delegates them to the care team, support staff and others according to the patient’s needs.

                    The system includes staff and room management.</p>
                    <img src={computer} alt="computer" className="computer"></img>
                    </div>
            </div>
        </div>

    )
}

export default Info