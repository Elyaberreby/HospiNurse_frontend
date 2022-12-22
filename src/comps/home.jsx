import React, { useEffect } from 'react'
import { GET_USER_API } from '../services/api';
import profile from '../image/profile.png'
import './home.css'
import { Link } from 'react-router-dom';
import { FaHandsHelping } from "react-icons/fa";
import { GiTowel } from "react-icons/gi";
import { GiMedicines } from "react-icons/gi";
import { TbMedicineSyrup } from "react-icons/tb";
import { RiNurseFill } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";


const Home = () => {
  useEffect(() => {
    GET_USER_API()
  }, [])

  return (
    <div className="container">
      <div className="wrapper">

        <Link to="/settings" className="imgs">
          <img src={profile} alt="S-profile" className="S-profile" />
        </Link>
        <div className="text">
          <h3>Hospi<br></br>Nurse</h3>
        </div>
      </div>
      <div className="main">
        <Link to="/Callspatient" className="callspatients">
          <FaBell size='1.5rem' color='black' /> <h7> My Calls </h7>
        </Link>
          <h3 className="sos">SOS <br></br><p1>Emergency</p1></h3>
        <div className="box1">
          <Link to="/GeneralHelp" className="general">
            <FaHandsHelping size='2.7rem' color='white' /><h6>General Help</h6>
          </Link>
          <Link to="/supplies" className="supplies">
            <GiTowel size='2.7rem' color='white' /><h4>Supplies</h4>
          </Link>
        </div>
        <div className="box2">
          <Link to="/pain" className="pain">
            <GiMedicines size='2.7rem' color='white' /><h5>Pain Relief</h5>
          </Link>
          <Link to="/Medical" className="Medical">
            <TbMedicineSyrup size='2.3rem' color="white" /><h5>Medical Treatment</h5>
          </Link>
        </div>
        <div className="box3">
          <Link to="/Medicines" className="medicalh">
            <GiMedicines size='2.7rem' color='white' /><h4>Medical Help</h4>
          </Link>
          <Link to="/Thank" className="thank" >
            <RiNurseFill size='2.7rem' color='white' /><h4>Thank You</h4>
          </Link>
        </div>
      </div>
      <footer className="footer">
        <Link to={'/Login'} className="Logout">
          <h2>Log Out</h2>
        </Link>

        <Link to={'/Info'} className="info">
          <AiOutlineInfoCircle size='1.8rem' color='black' />Info</Link>
      </footer>

    </div>

  )
}

export default Home