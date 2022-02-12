import { Link } from "react-router-dom"
import React,{useState,useEffect, useReducer} from "react"
import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight, faUserGraduate } from '@fortawesome/free-solid-svg-icons'

export const Navbar = ()=>{
    let navigate = useNavigate();

    const [userCheck, setUserCheck] = useState(true);
    const [name,setName] = useState(false)
    // BACK AND FORWARD BUTTON ICONS IN NAVIGATION BAR
    const backArrow = <FontAwesomeIcon icon={faArrowLeft} />
    const fwdArrow = <FontAwesomeIcon icon={faArrowRight} />
    const userNew = <FontAwesomeIcon icon={faUserGraduate} />

    // BACK-BUTTON AND FORWARD-BUTTON IN NAVIGATION BAR
    const backBtn = ()=>{
        navigate(-1)
    }
    const fwdBtn = ()=>{
        navigate(1)
    }

    useEffect(()=>{
        // console.log(localStorage.getItem("UserName"));
        if(localStorage.getItem("UserID")) {
            setName(true) 
            setUserCheck(false)
        }
        // localStorage.getItem("UserName") && setName(true)
        // localStorage.getItem("UserID")!==null &&  setUserCheck(false)
    },[localStorage.getItem("UserID")])

    const btnToLogin = ()=>{
        navigate("/login")
    }

    const logoutFunc = ()=>{
        // this is used to logout the user which is loggedIn
        localStorage.removeItem('UserID')
        localStorage.removeItem("UserName")
        navigate("/")
    }

    const btn_to_login = <button onClick={btnToLogin} style={link_ItemBtn}>Login</button>
    const logout = <button onClick={logoutFunc} style={link_Item_logout}>Logout</button>
    const name_title = <div style={linkItemUser}> {userNew} {localStorage.getItem("UserName")}</div>
    const loginLink = <Link to="/login" style={linkItem}>Login</Link>
    const singupLink = <Link to="/signup" style={linkItem}>Signup</Link>

    return (
        <div style={navBar}>
            <div style={links}>
                <button onClick={backBtn} style={linkItemBtn}>{backArrow}</button>
                <Link to="/" style={linkItem}>Home</Link>
                <Link to="/todos" style={linkItem}>Todos</Link>

                {/* Hide buttons after the User Login */}
                {userCheck ? loginLink : logout}
                {userCheck && singupLink}
                <Link to="/contact" style={linkItem}>Contact</Link>

                {/* If the name value is 2 then show the Logged in User_Name
                Otherwise show the Login Button */}
                {name ? name_title : btn_to_login }
                <button onClick={fwdBtn} style={linkItemBtnFwd}>{fwdArrow}</button>
            </div>
        </div>
    )
}

// STYLING SECTION (CSS)
const navBar = {
    position:"sticky",
    top: "0px"
}
const links = {
    display:"flex",
    backgroundColor: "#a866c4",
    color: "white",
    listStyle:"none",
    fontWeight:"bold",
    fontSize:"18px",
    padding: "10px"
}
const linkItem = {
    padding: "1% 1%",
    margin: "0px 1.5%",
    textDecoration: "none",
    color:"white"
}
const linkItemUser = {
    padding: "1% 1%",
    margin: "0px 1.5%",
    textDecoration: "none",
    color:"white",
    border: "1px solid white",
    borderRadius: "15px",
    position: "absolute",
    right: "90px"
}
const linkItemBtn = {
    padding: "0.5% 1%",
    margin: "0px 1.5%",
    textDecoration: "none",
    color:"white",
    backgroundColor: "#671d73",
    fontWeight: "bold",
    fontSize: "22px",
    border: "none",
    borderRadius: "100px"
}
const link_ItemBtn = {
    padding: "0.5% 1%",
    margin: "0.5% 1.5%",
    textDecoration: "none",
    color:"white",
    backgroundColor: "#671d73",
    fontWeight: "bold",
    fontSize: "18px",
    border: "none",
    borderRadius: "15px",
    position: "absolute",
    right: "90px"
}

const link_Item_logout = {
    padding: "0.5% 1%",
    margin: "0.5% 1.5%",
    textDecoration: "none",
    color:"white",
    backgroundColor: "#671d73",
    fontWeight: "bold",
    fontSize: "18px",
    border: "none",
    borderRadius: "15px",
    position: "absolute",
    right: "280px"
}
const linkItemBtnFwd = {
    right: "0px",
    position: "absolute",
    padding: "0.65% 0.9%",
    margin: "0px 1.5%",
    textDecoration: "none",
    color:"white",
    backgroundColor: "#671d73",
    fontWeight: "bold",
    fontSize: "22px",
    border: "none",
    borderRadius: "100px"
}