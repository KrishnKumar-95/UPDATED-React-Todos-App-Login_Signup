import axios from 'axios';
import React,{useEffect, useState,useRef} from 'react'
import { Watch } from  'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { Header } from './Header';
import { Navbar } from './Navbar';
import './todo.css';
const Todo = ()=>{
    let navigate = useNavigate();
    const inputRef = useRef()

    // State variables
    const [enteredTodos, setEnteredTodos] = useState({items:[]});
    const [enteredTodo,setEnteredTodo] = useState("");
    const [enteredDesc,setEnteredDesc] = useState("");
    const [loading, setLoading] = useState(false);

    // showing the Update todo button when the edit button is clicked instead Add todo
    const [isEdit,setIsEdit] = useState(0)

    // giving the position of the todo in array which is to be updated
    const [posEdit,setPosEdit] = useState(null)
    
    let [time, setTime] = useState("01 January 2022");

    useEffect(() => {
        // here we can see that if the userId of the user is not exists in the localStorage user will navigate to the login page for login
        if(!localStorage.getItem('UserID')) {
            navigate("/login")
        }
    },[navigate])
    
    useEffect(() => {
        // console.log(localStorage.getItem('UserID'));
        axios.post("http://localhost:8000/gettodos",{userid:localStorage.getItem('UserID')}).then((res)=>{
            // console.log(res.data);
            setEnteredTodos({items: res.data.todos})
        })
    },[])

    setInterval(()=>{
        setTime(new Date().toLocaleTimeString())
    },1000)

    const addTodo = (newTodo,newDesc)=>{

        const mytodo = {
            todo: newTodo,
            desc: newDesc
        }
        const _temp = enteredTodos.items
        _temp.push(mytodo)

        setEnteredTodos({items:_temp})

        // axios.post("http://localhost:8000/posttodo",[...enteredTodos,mytodo]).then((res)=>{
        // sending the entered todos with the user id of the logged in user to the backend
        axios.post("http://localhost:8000/posttodo",{todos :enteredTodos.items,userid:localStorage.getItem('UserID')}).then((res)=>{
            console.log(res.data);  // printing the data comes from backend in json form
        })

        setLoading(false)
        inputRef.current.focus()
        // this will set the input fields to its default state
        setEnteredTodo("")
        setEnteredDesc("")
    }

    const submitForm = (event)=>{
        setLoading(true)
        event.preventDefault();

        // Can't submit form with empty fields
        if((enteredTodo==="")||(enteredDesc==="")){
            alert("Both fields are required can't be empty")
        }else{
            addTodo(enteredTodo,enteredDesc);

        }

    }

    const deleteBtn = (pos)=>{
        // setEnteredTodos(enteredTodos.items.filter((e)=>{return e !== item}))
        enteredTodos.items.splice(pos,1)
        setEnteredTodos(enteredTodos)
        axios.post("http://localhost:8000/posttodo",{todos: enteredTodos.items, userid: localStorage.getItem("UserID")}).then((res)=>{
            console.log(res);
        })
    }

    const editItem = (item,pos) => {
        setIsEdit(1)

        // giving the position of the todo which is going to be updated
        setPosEdit(pos)
        setEnteredTodo(item.todo)
        setEnteredDesc(item.desc)
    }

    const updateBtn = (event) => {
        event.preventDefault();
        setLoading(true);
        if((enteredTodo==="")||(enteredDesc==="")){
            alert(`Both fields shouldn't be Empty to Update`)
        }else{
            const mytodo = {
                todo: enteredTodo,
                desc: enteredDesc
            }
            enteredTodos.items.splice(posEdit,1,mytodo)
            axios.post("http://localhost:8000/posttodo",{todos: enteredTodos.items, userid: localStorage.getItem("UserID")}).then((res)=>{
                console.log(res);
            })
            setLoading(false)
            setIsEdit(0)
            setEnteredTodo("")
            setEnteredDesc("")
        }
    }

    return (
        <div>
            <Navbar/>
            <Header/>
        <div style={mainDiv}>
            <form onSubmit={submitForm}>
                <h2> Todo Maker </h2>
                <div>Time :&nbsp;&nbsp;{time}</div><br />
                <div style={inputFields}>
                    {loading && <Watch heigth="100" width="100" color="#a866c4" ariaLabel='loading'/>}
                    Enter Todo :&nbsp;&nbsp;&nbsp;
                    <input 
                        ref={inputRef}
                        style={inputField} 
                        type="text"
                        value={enteredTodo}
                        onChange={(inputTodo)=>{setEnteredTodo(inputTodo.target.value)}}
                        placeholder="Enter your Todo here" />

                    Enter Desc :&nbsp;&nbsp;&nbsp;
                    <input 
                        style={inputField} 
                        type="text"
                        value={enteredDesc}
                        onChange={(inputDesc)=>{setEnteredDesc(inputDesc.target.value)}} 
                        placeholder="Enter related description"/>

                    {isEdit === 0 ? <input 
                        style={submitBtn} 
                        className="btn" 
                        type="submit" 
                        value="Add Todo"
                    /> :  <button style={submitBtn} onClick={updateBtn}>Update Todo</button>        }

                    
                    <p>Total Todos : {enteredTodos.items.length}</p>

                </div>
            </form>
                <div style={mainBox}>

                    {enteredTodos.items.map((item,pos)=>{return (
                        <div key={pos} style={todoBox}>
                            <h4 style={todoHeading}>{item.todo}</h4>
                            <p style={todoDesc}>{item.desc}</p>
                            <button style={deleteStyle} onClick={()=>deleteBtn(pos)}>Delete</button>
                            <button style={deleteStyle} onClick={()=>editItem(item,pos)}>Edit</button>
                        </div>
                    )})}
                </div>
        </div>
        </div>
    )
}

// CSS Part
const mainDiv = {
    padding:"18px",
    border:"2px solid black",
    margin:"5%",
    borderRadius:"15px"
}
const inputField = {
    padding:"5px",
    margin:"10px 0px",
    display: "flex",
    width: "94%",
    fontSize: "17px"
}
const inputFields = {
    display: "flex",
    flexDirection: "column"
}
const submitBtn = {
    padding: "12px 0px",
    width: "7rem",
    fontSize: "17px",
    borderRadius: "8px",
    border: "none",
    color:"white",
    fontWeight:"bold",
    margin: "20px 5px",
    backgroundColor: "#a866c4"
}
const todoBox = {
    border:"1.5px solid transparent",
    borderRadius:"10px",
    backgroundColor:"#ad6bc2",
    boxShadow: "1px 3px 5px 4px #3d3c38",
    width:"94%",
    margin:"15px 5px",
    color:"white"
}
const mainBox = {
    backgroundColor:"#bdbebf",
    padding:"15px 5px",
    margin: "15px 0px",
    borderRadius: "23px"

}
const todoHeading = {
    padding:"0px 2.5rem"
}
const todoDesc = {
    padding: "0px 2.5rem"
}

const deleteStyle = {
    padding: "1.5% 5%",
    fontSize: "17px",
    fontWeight: "bold",
    borderRadius: "10px",
    border:"none",
    margin: "15px 5px"
}

export default Todo