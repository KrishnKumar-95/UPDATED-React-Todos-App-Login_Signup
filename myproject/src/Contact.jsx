import { Header } from "./Header"
import mypic from "./krishnkumar.jpeg"
import { Navbar } from "./Navbar"

export const Contact = ()=>{

    return (
        <div>
        <Navbar/>
        <Header/>
        <div style={mainDiv}>
            <img style={picStyle} src={mypic} alt="Krishn Kumar" />
            <div>
                <h3>Name : Krishn Kumar</h3>
                <h3>Phone No : 9518297071</h3>
                <h3>Qualification : BCA</h3>
                <h3>Email : krishnkumar180895@gmail.com</h3>
            </div>
        </div>
        </div>
    )
}

const mainDiv = {
    padding:"18px",
    border:"2px solid black",
    margin:"5%",
    borderRadius:"15px",
    display:"flex",
    justifyContent: "space-between",
    flexDirection: "column"
}
const picStyle = {
    width: "20%"
}