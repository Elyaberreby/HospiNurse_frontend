import React from 'react'
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { method_user_api } from '../services/api';
import './Setting.css'
const Setting = () => {
    const navigate = useNavigate();
    //useform - לpackage של react hook form , 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [userInfo, setUserInfo] = useState({});
    //  מאפשר להשתמש בשינויים בדום , פונקציה של ריאקט הוק , מאפשר להשתמש ביכולות של ריאקט
    useEffect(() => {
        getUserDetails();
    }, []);


    const getUserDetails = async () => {
        try {
            const user = await method_user_api("/users/verify", "POST", {});
            if (user?.err_msg) {
                return navigate("/login");
            }

            setUserInfo(user?.data);
        }
        catch (error) {
            navigate("/login");
        }
    }

    const onSubmit = async (formData) => {
        try {
            const appDateUser = await method_user_api("/users/update", "PUT", formData);
            alert("your details updated");
        }
        catch (error) {
            console.log(error);
            navigate("/login");
        }
    }


    return (
        <div className="settings_container">
            <h1>Update Details</h1>
            <form className='settingsForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name </label>
                    <input defaultValue={userInfo?.name} id="name" type="text" className="form-control" aria-describedby="nameHelp"
                        {...register("name", { required: true, pattern: "/^\S+@\S+\.\S+$/", minLength: 5, maxLength: 50 })} />
                    <br></br>
                    {errors.name && <span className="text-danger">you must to enter a valid name</span>}
                </div>
                <br></br>
                <div className="mb-3">
                    <label for="email" className="form-label">Email </label>
                    <input defaultValue={userInfo?.email} id="email" type="text" className="form-control" aria-describedby="emailHelp"
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
                <div className="mb-3">
                    <label for="exampleInputroom" className="form-label">Room(only for patients)</label>
                    <input defaultValue={userInfo?.room} id="exampleInputroom" type="text" className="form-control"
                        {...register("room", { required: false, minLength: 1, maxLength: 10 })} />
                    <br></br>
                    {errors.room && <span className="text-danger">you must to enter a valid room</span>}
                </div>
                <br></br>
                <button type="submit" className=" submit btn btn-primary">Submit</button>
                <br></br>
                <Link className="link" to="/">
                    back
                </Link>
            </form>
        </div>
    )
}

export default Setting