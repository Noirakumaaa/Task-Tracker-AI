interface TaskItem {
    user_id: string
    name: string,
    description: string,
    status: string,
    start_date: string;
    deadline: string;
}

const getAllTodo = async () => {
    const res = await fetch("http://localhost:3000/api/task",{
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    const resData = await res.json()
    return resData
  };


const postTodoItem = async (data: TaskItem) =>{
    const res = await fetch("http://localhost:3000/api/task",{
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
            
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    return resData
}


const deleteTodoItems = async (data: TaskItem[])=>{
    console.log(data)
    const res = await fetch("http://localhost:3000/api/task",{
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    const result = await res.json()
    return result
}


const updateTodoItem = async (data: TaskItem[],status :string)=>{
    console.log(data,status, "WORLD")
    const res = await fetch("http://localhost:3000/api/task",{
        method: "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({data:data, status: status})
    })
    const result = await res.json()
    return result
}

export {getAllTodo, postTodoItem,deleteTodoItems,updateTodoItem}
  