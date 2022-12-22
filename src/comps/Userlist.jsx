import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { method_user_api } from '../services/api';
import  './Userlist.css'

const Userlist = () => {
    //state - משתנה עם פונקציה
    // ערך , מתודה 
    //לשמור את מה שקיבלנו ב state
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        isAdmin();
        getallusers();
    }, [])

    const isAdmin = async () => {
        try {
            const admin = await method_user_api("/users/verifyadmin", "POST");
            if (!(admin?.data?._id)) {
                navigate("/login");
            }
        }
        catch (err) {
            console.log(err);
            navigate("/login");

        }
    }


    
    // בקשה לשרת כדי לקבל את כול היוזרים 

    const getallusers = async () => {
        try {
            const users = await method_user_api("/users/", "GET", {});
            console.log(users);
            setAllUsers(users);
        }
        catch (err) {
            console.log(err);
        }
    }


    


    // MAP לולאה שרצה על כול היוזרים כדי להשתמש בערך שלהם 
    return (
        <div>
            <h1 className="text_userlist">Users List</h1>
            {
                allUsers.map((user, i) => {
                    return (  
                        <div>       
                        <div className="users" key={i}>
                            <p>Name : {user.name}</p>
                            <p>Email : {user.email}</p>
                            <p>Number of Room : {user.room}</p>
                            <p>{user.role}</p>
                            <br></br>
                            {/* לינק שמוביל לאדמין , מוסיפים קווארי שמכיל את האיי די של היוזר  */}
                            <Link to={`/admin?id=${user._id}`}><h3>Update User</h3></Link>
                            <br></br>
                        </div>
                        </div>  
                    )
                })
            }

        </div>
    )
}

export default Userlist