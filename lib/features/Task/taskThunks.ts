import {getAllTodo, postTodoItem,deleteTodoItems,updateTodoItem} from "./taskAPI";
import { setTaskList, setSelectedTaskList,setError ,setEditMode} from "./taskSlice";
import { setNotification } from "../Notification/notificationSlice";

interface Task {
    user_id: string;
    name: string;
    description: string;
    status: string;
    start_date: string;
    deadline: string;
  }
  

export const fetchTodo = () => async (dispatch:any)=>{
    try {
        const tasks = await getAllTodo();
        dispatch(setTaskList(tasks.TaskList));
      } catch (error) {
        dispatch(setError("Failed to load tasks"));
      }
}

export const addTask = (task: Task) => async (dispatch: any) => {
    try {
        dispatch(setNotification({
          name: "loading",
          link: "Close",
          notification_type: "loading"
        }))
        const res = await postTodoItem(task);
        
        if(res){
          dispatch(fetchTodo());
          dispatch(setNotification({
            name: "Task added",
            link: "Close",
            notification_type: "success"
          }))
        }
    
      
      } catch (error) {
        dispatch(setError("Failed to add task"));
      }

}


export const addSelectedTask = (data: any) => async (dispatch: any) => {
    try {

        dispatch(setSelectedTaskList(data));
      } catch (error) {
        dispatch(setError("Failed to add task"));
      }
}

export const deleteTask = (data: any)=> async (dispatch: any) =>{
    try {
  
      dispatch(setNotification({
        name: "loading",
        link: "Close",
        notification_type: "loading"
      }))
      const result = await deleteTodoItems(data.task);
      if(result){
        dispatch(fetchTodo())
        dispatch(setEditMode(false))
        dispatch(setNotification({
          name: "Task Removed",
          link: "Close",
          notification_type: "success"
        }))
      }
  
    } catch (error) {
      dispatch(setNotification({
        name: "Error",
        link: "Close",
        notification_type: "error"
      }));
    }
  }



export const updateTask = (data :any,status: string )=> async(dispatch:any)=>{
    try{
  
      console.log(data.task, status, "HELoooooooooooo")
      dispatch(setNotification({
        name: "loading",
        link: "Close",
        notification_type: "loading"
      }))
    
      const res = await updateTodoItem(data.task,status)
      if(res){
        dispatch(fetchTodo())
        dispatch(setNotification({
          name: "Task updated",
          link: "Close",
          notification_type: "success"
        }))
      }
  
    }catch(error){
      dispatch(setNotification({
        name: "Error",
        link: "Close",
        notification_type: "error"
      }));
    }
  }