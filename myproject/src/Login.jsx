import { useState,useEffect } from "react"
import axios from 'axios'
import { Watch } from  'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import { Navbar } from "./Navbar";
import { Header } from "./Header";

export const Login = ()=>{

    //Icons
    const warnWrongPass = <FontAwesomeIcon icon={faWarning} />
    const notFound = <FontAwesomeIcon icon={faQuestionCircle} />

    // Navigation
    let navigate = useNavigate();

    // States
    const [email, setLoginEmail] = useState("");
    const [password, setLoginPass] = useState("");
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [wrongPass, setWrongPass] = useState(2);

    useEffect(() => {

        if(parseInt(localStorage.getItem('gotologin')) === 2) {
            setSuccess(true)
        }
        else {
            setSuccess(false)
        }
    },[])

    const userLogin = (e)=>{
        e.preventDefault()
        
        setLoading(true)
            axios.post(`http://localhost:8000/login`, { email,password })
            .then(res => {
                // << code 1 >> is sent by the backend when user password matches the entered password so we will let him login and redirect to the todos page
                if(res.data.code === 1) {
                    localStorage.setItem('UserID', res.data.userid);
                    localStorage.setItem('UserName',res.data.name);
                    navigate("/todos");
                }
                else if(res.data.code === -1){
                    navigate("/login")
                    setWrongPass(1)
                }else{
                    navigate("/login")
                    setWrongPass(0)
                }

                // resetting the fields to their normal state (empty)
                setLoginEmail("")
                setLoginPass("")
                setLoading(false)
            })
    }

    const toSignup = ()=>{
        navigate("/signup")
    }

    // Msgs for different condition
    const wrongPassMsg = <h3 style={wrongPassStyle}>{warnWrongPass}&nbsp;&nbsp;&nbsp;&nbsp;You Entered Incorrect Login Details please try with another</h3>
    const wrongPassMsgnotFound = <h3 style={wrongPassStyle}>{notFound}  &nbsp;&nbsp;&nbsp;&nbsp;  User not found click on signup first <button style={tosignupBtn} onClick={toSignup}>Signup</button></h3>

    return (
        <div>
            <Navbar/>
            <Header/>
        <div style={mainDiv}>
            {/* Loader until login */}
            {loading && <Watch heigth="100" width="100" color="#a866c4" ariaLabel='loading'/>}
            {wrongPass=== 1 && wrongPassMsg}
            {wrongPass=== 0 && wrongPassMsgnotFound}

            {success && <h3 style={sucessRegister}>Now you can login with your registered email and password</h3>}

            {/* {signuptoLogin && <h3 style={sucessRegister}>Now you can login with your registered email and password</h3>} */}
            <h2>Login Form</h2>
            <div style={inputFields}>
                <form onSubmit={userLogin}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(val)=>{
                            setLoginEmail(val.target.value
                        )}} 
                        style={inputField} 
                        name="email" 
                        placeholder="Enter email..."
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(val)=>{
                            setLoginPass(val.target.value)
                        }} 
                        style={inputField} 
                        name="password" 
                        placeholder="Enter password..."
                    />
                    <input 
                        type="submit" 
                        style={submitBtn} 
                        value="Login"
                    />
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

const sucessRegister = {
    backgroundColor: '#a3c9b2',
    fontWeight: "bold",
    borderRadius: "12px",
    padding: "15px",
    color: "green"
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
const tosignupBtn = {
    padding: "12px 0px",
    width: "7rem",
    fontSize: "17px",
    borderRadius: "8px",
    border: "none",
    color:"white",
    fontWeight:"bold",
    margin: "0px 15px",
    backgroundColor: "#a866c4"
}

const mainDiv = {
    padding:"18px",
    border:"2px solid black",
    margin:"5%",
    borderRadius:"15px"
}
