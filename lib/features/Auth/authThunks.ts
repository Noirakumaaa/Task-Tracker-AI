
import { LoginUser, RegisterUser } from "./authAPI";
import { setNotification } from "@/lib/features/Notification/notificationSlice";
import { logout, setCurrentUser } from "./authSlice";
import Cookies from "js-cookie";

interface userLogin {
  email: string;
  password:string
}

interface userRegister {
  name : string
  email : string
  password :string
}



export const login = (data: userLogin) => async (dispatch:any) =>{
  try{
    dispatch(setNotification({
      name : "loading",
      link : "Close",
      notification_type: "loading"
    }))
    const res = await LoginUser(data)
    dispatch(setCurrentUser({
      token: res.token,
      role:res.role,
      id: res.id
    }))
    Cookies.set("token",res.token ,{ path: "/" });
    Cookies.set("role", res.role,{ path: "/" });
    Cookies.set("user_id",res.id ,{ path: "/" });
    if(res){
      dispatch(setNotification({
        name : "Login Successfully",
        link : "Close",
        notification_type: "success"
      }))
    }
  }catch(error){
    dispatch(setNotification({
      name : "Login Error",
      link : "Close",
      notification_type: "Error"
    }))
  }
}

export const register = (data: userRegister) => async (dispatch:any) =>{
  try{
    dispatch(setNotification({
      name : "loading",
      link : "Close",
      notification_type: "loading"
    }))
    const res = await RegisterUser(data)
    if(res){
      dispatch(setNotification({
        name : "Register Successfully",
        link : "login",
        notification_type: "success"
      }))
    }
  }catch(error){
    dispatch(setNotification({
      name : "Register Error",
      link : "Close",
      notification_type: "Error"
    }))
  }
}


  export const Logout = () => async (dispatch: any) => {
      try{
      dispatch(setNotification({
        name : "loading",
        link : "Close",
        notification_type: "loading"
      }))
      dispatch(logout());
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("user_id", { path: "/" });
      dispatch(setNotification({
        name : "Logout Successfully",
        link : "Close",
        notification_type: "success"
      }))
      
    }catch(error){
      dispatch(setNotification({
        name : "Register Error",
        link : "Close",
        notification_type: "Error"
      }))
    }
    };
  