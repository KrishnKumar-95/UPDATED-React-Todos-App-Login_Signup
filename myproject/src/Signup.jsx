import { useState,useEffect } from "react"
import axios from 'axios'
import { Watch } from  'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Navbar } from "./Navbar";


export const Signup = ()=>{

    let navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [wrongPass, setWrongPass] = useState(false);

    const [loading,setLoading] = useState(false)

        // Connection with the BackEnd File (app.js)
        useEffect(()=>{
            localStorage.removeItem('gotologin')
            axios.get(`http://localhost:8000/`)
            .then((res)=>{
                // Backend se aya hua data yha aega or print hoga
                console.log(res.data);
            })
        },[])

    const userSignup = (e)=>{
        e.preventDefault();
        localStorage.removeItem('gotologin')
        // this preventes it from its default behaviour of autosubmission
        setLoading(true)
        axios.post(`http://localhost:8000/signup`,{name,email,password,confirmPassword})
        .then(res=>{console.log(res.data);

            if(res.data.code===1){
                // making this true we will show the msg of password must be same
                setWrongPass(true)
            }else{
                localStorage.setItem("gotologin",2)
                navigate("/login")
                // resetting all fields to their default state (empty)
                setName("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
        setLoading(false)
        })
    }

    return (
        <div>
        <Navbar/>
        <Header/>
        <div style={mainDiv}>
            <h2>Signup Form</h2>
            <div style={inputFields}>
                {loading && <Watch heigth="100" width="100" color="#a866c4" ariaLabel='loading'/>}
                {wrongPass && <h3 style={wrongPassStyle}>Both Passwords must be same for Signup</h3>}
                <form onSubmit={userSignup}>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}  style={inputField} name="name" placeholder="Enter name"/>
                    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={inputField} name="email" placeholder="Enter email"/>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  style={inputField} name="password" placeholder="Enter password"/>
                    <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}  style={inputField} name="confirmpassword" placeholder="Repeat password"/>
                    <input type="submit" style={submitBtn} value="Signup"/>
                </form>
            </div>
        </div>
        </div>
    )
}

const inputField = {
    padding:"5px",
    margin:"10px 0px",
    display: "flex",
    width: "75%",
    fontSize: "17px"
}

const inputFields = {
    display: "flex",
    flexDirection: "column"
}

const wrongPassStyle = {
    color: "red",
    backgroundColor: "#fab9c6",
    fontWeight: "bold",
    borderRadius: "12px",
    padding: "15px"
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

const mainDiv = {
    padding:"18px",
    border:"2px solid black",
    margin:"5%",
    borderRadius:"15px"
}
