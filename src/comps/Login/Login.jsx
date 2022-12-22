import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../image/profile.png'
import './Login.css'
import { GiHospitalCross } from "react-icons/gi";
import { method_user_api } from '../../services/api';

const Login = () => {
  const navigate = useNavigate()// ליצירת ניוותים באתר 

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    delete data["form_check"];
    try {
      const login = await method_user_api("/users/login", "POST", { email: data?.email, password: data?.password })
      if (login?.token) {
        localStorage.setItem("x-api-key", login?.token);
        navigate("/")
      }
      else {
        console.log(login);
      }


    }

    catch (err) {
      console.log("the user not found");
    }
  };


  return (
    <div className="login-page container my-5" >
      <div>
        <h1><GiHospitalCross size='4rem' /> HospiNurse</h1>
      </div>
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email </label>
              <input id="exampleInputEmail1" type="text" className="form-control" aria-describedby="emailHelp"
                {...register("email", { required: true, pattern: "/^\S+@\S+\.\S+$/", minLength: 5, maxLength: 50 })} />
              <br></br>
              {errors.email && <span className="text-danger">you must to enter a valid email</span>}
            </div>
            <br></br>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Password </label>
              <input id="exampleInputPassword1" type="password" className="form-control"
                {...register("password", { required: true, minLength: 6, maxLength: 20 })} />
              <br></br>
              {errors.password && <span className="text-danger">you must to enter a valid password</span>}
            </div>
            <br></br>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"
                {...register("form_check", { required: true })} />
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
              <br></br>
              {errors.form_check && <span className="text-danger">you must agree to the terms</span>}
            </div>
            <button type="submit" className=" submit btn btn-primary">Submit</button>

          </form>
        </div>
        <br></br>
        <Link className="signUp" to={'/SignUp'}>SignUp</Link>
      </div>

    </div>


  );
}

export default Login