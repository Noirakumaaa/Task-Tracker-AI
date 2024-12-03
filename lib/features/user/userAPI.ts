import { headers } from "next/headers";


interface LoginData {
    email : string;
    password: string;
}
interface RegisterData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    age: number;
    user_type: string
}

export const loginUser = async (data: LoginData) => {
    const res = await fetch("http://localhost:3000/api/login",{
        method: "POST",
        headers : {
            "Content-Type" : "application/json",

        },
        body : JSON.stringify(data)
        }
    )
    const resData = await res.json()
    return resData
}



export const registerUser = async (data :RegisterData) =>{
    const res = await fetch("http://localhost:3000/api/addUser",{
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data)

    })
    const resData = await res.json()
    return resData
}