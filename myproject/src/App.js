import { Login } from "./Login";
import Todo from "./Todo";
import {Route,Routes} from "react-router-dom"
import { Contact } from "./Contact"
import { Signup } from "./Signup";
// import {Reducer} from "./Reducer"

const App = ()=>{
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/todos" element={<Todo/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/contact" element={<Contact />}/>
    </Routes>
    </div>
    // <>
    //   <Reducer />
    // </>
  )
}

export default App