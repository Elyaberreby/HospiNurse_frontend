import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { method_user_api } from '../services/api';



//מהאתר של ריאקט - הוק שמדבר עם הקווארי משתמשים בו לדבר עם הקוואריס 
const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Admin = () => {
  // מאפשר לשלוף קווארי מהיו אר אל 
  const query = useQuery();
  const [user, setUser] = useState({});
  // ערך דיפולטיבי - ערך שכאשר טוענים את הדף הוא ישר יופיע 
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // hook מובנה בריקאט
  useEffect(() => {
    isAdmin();
    getUser();
  }, []);

// מעדכן את הפרטים של היוזר 
  const updateUser = async (formData) => {
    try {
      const user = await method_user_api("/users/adminupdate/" + query.get("id"), "PUT", formData);
      if (user?.modifiedCount === 1) {
        alert("User Updated");
      }
    }
    catch (err) {
      console.log(err);
    }

  }

  //שולח בקשה לקבלת פרטים על היוזר עם האיי די ששלחנו 
  const getUser = async () => {
    try {
      const user = await method_user_api("/users/one/" + query.get("id"), "GET", {});
      setUser(user);
    }
    catch (err) {
      console.log(err);
    }
  }

  const isAdmin = async () => {
    try {
      const admin = await method_user_api("/users/verifyadmin", "POST", {});
      if (!admin?.data?._id) {
        navigate("/login");
      }
    }
    catch (err) {
      console.log(err);
      navigate("/login");

    }
  }

  const onSubmit = async (formData) => {
    try {
      await updateUser(formData);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (

    <div className="container_Admin">

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>User Details</h1>
        <div className="mb-3">
          <label for="name" className="form-label">Name </label>
          <input defaultValue={user?.name} id="name" type="text" className="form-control" aria-describedby="nameHelp"
            {...register("name", { required: true, pattern: "/^\S+@\S+\.\S+$/", minLength: 5, maxLength: 50 })} />
          <br></br>
          {errors.name && <span className="text-danger">you must to enter a valid name</span>}
        </div>
        <br></br>
        <div className="mb-3">
          <label for="email" className="form-label">Email </label>
          <input defaultValue={user?.email} id="email" type="text" className="form-control" aria-describedby="emailHelp"
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
        <div className="mb-3">
          <label for="exampleInputroom" className="form-label">Room(only for patients)</label>
          <input defaultValue={user?.room} id="exampleInputroom" type="text" className="form-control"
            {...register("room", { required: false, minLength: 1, maxLength: 10 })} />
          <br></br>
          {errors.room && <span className="text-danger">you must to enter a valid room</span>}
        </div>
        <div>
          <label className="form-label">Role</label>

          <select defaultValue={user?.role} {...register("role", { required: false })} >
            <option selected={user?.role?.toLowerCase() === "admin"} value={"admin"}>Admin</option>
            <option selected={user?.role?.toLowerCase() === "nurse"} value={"nurse"}>Nurse</option>
            <option selected={user?.role?.toLowerCase() === "user"} value={"user"}>User</option>
          </select>
        </div>
        <br></br>
        <button type="submit" className=" submit btn btn-primary">Submit</button>
        <br></br>
        <Link to="/Userlist">
          <h2>back</h2>
        </Link>
      </form>
    </div>

  )
}

export default Admin