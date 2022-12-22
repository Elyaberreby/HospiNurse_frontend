import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { method_user_api } from '../../services/api';
import './SignUp.css'

export const SignUp = () => {
    const navigate = useNavigate()// ליצירת ניוותים באתר 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        delete data["form_check"];
        try {
            const user = await method_user_api("/users", "POST", data);
            if (user?._id) {
                const login = await method_user_api("/users/login", "POST", { email: data?.email, password: data?.password })
                if (login?.token) {
                    localStorage.setItem("x-api-key", login?.token);
                    navigate("/")
                }
                else {
                    console.log(login);
                }
            }
            else {
                console.log(user);
            }

        }

        catch (err) {
            console.log("the user not found");
        }
    };



    return (
        <div className="sign-page container" >
            <div className="sub-main">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>SignUp</h1>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name </label>
                        <input id="name" type="text" className="form-control" aria-describedby="nameHelp"
                            {...register("name", { required: true, pattern: "/^\S+@\S+\.\S+$/", minLength: 5, maxLength: 50 })} />
                        <br></br>
                        {errors.name && <span className="text-danger">you must to enter a valid name</span>}
                    </div>
                
                    <div className="mb-3">
                        <label for="email" className="form-label">Email </label>
                        <input id="email" type="text" className="form-control" aria-describedby="emailHelp"
                            {...register("email", { required: true, pattern: "/^\S+@\S+\.\S+$/", minLength: 5, maxLength: 50 })} />
                        <br></br>
                        {errors.email && <span className="text-danger">you must to enter a valid email</span>}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password </label>
                        <input id="exampleInputPassword1" type="password" className="form-control"
                            {...register("password", { required: true, minLength: 6, maxLength: 20 })} />
                        <br></br>
                        {errors.password && <span className="text-danger">you must to enter a valid password</span>}
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputroom" className="form-label">Room(only for patients)</label>
                        <input id="exampleInputroom" type="text" className="form-control"
                            {...register("room", { required: false, minLength: 1, maxLength: 10 })} />
                        <br></br>
                        {errors.room && <span className="text-danger">you must to enter a valid room</span>}
                    </div>

                    <br></br>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"
                            {...register("form_check", { required: true })} />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                        <br></br>
                        {errors.form_check && <span className="text-danger">you must agree to the terms</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <br></br>
                    <Link className="Login" to={'/Login'}>Login</Link>
                </form>
            </div>
        </div>

    );
}

export default SignUp
