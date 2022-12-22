const { default: axios } = require("axios");

const BASE_URL_SERVER = 'http://localhost:3004'

const axiosInstance = axios.create({
    baseURL: BASE_URL_SERVER
});

export const GET_USER_API = async () => {
    try {
        const userRes = (await axiosInstance.get("/users"));
        // const userRes = (await axiosInstance.post("/users",{name:'person4', email:'person4@test.com',password:'123'}));
        console.log(userRes);
        return userRes;
    }

    catch (err) {
        console.log(err);
        throw new Error("there is error");
    }
}

// /products
//http://localhost:3004/products

// method = POST

//name
//email
//password

// {name: name, email: email, password: password}

export const method_user_api = async (url, method, body) => {
    try {
        let response;
        if (method?.toLowerCase() === "get") {
            response = await fetch(BASE_URL_SERVER + url);
        }
        else {
            response = (await fetch(BASE_URL_SERVER + url, {
                method: method, body: JSON.stringify(body ? body : {}), headers: {
                    "Content-Type": "application/json",
                    "x-api-key": localStorage.getItem("x-api-key")// מחזיר אוביקט שמכיל בתוכו את המידע שנשלח מהשרת ובשביל לגשת למידע שאנחנו רוצים אנחנו נעשה נקודה json
                }
            }))
        }

        const data = await response?.json();// 
        return data;

    }

    catch (error) {
        return { error: error };
    }
}