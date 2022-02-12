const express = require("express");
const cors = require('cors');
const User = require("./model/User");
const app = express();
const port = process.env.PORT || 8000;
require("./connection");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Yha se JSON me data jaega or React ke Axios me << res.data >> ke through receive hoga
app.get("/",(req,res)=>{
    res.json({msg:"Welcome Krishn"})
})

// Login
app.post('/login',async(req,res) => {

    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    try{
        const getUser = await User.findOne({email: enteredEmail})
        
        if(!getUser){
            return res.json({code:0,msg: `User Not Found can't Login`})
            
        }else if(getUser){
            const userPass = getUser.password;
            const userName = getUser.name;
            const userTodos = getUser.todos;
            if(enteredPassword===userPass){
                // here << code=1 >> is to compare that user is logged in or not
                return res.json({code:1,msg: `User Found and Login Successful`,userid:getUser._id,name:userName,todos: userTodos})
            }else{
                return res.json({code:-1,msg: `You entered Wrong Password`})
            }
        }
    }catch(err){
        console.log(err)
    }
})


// Signup
app.post("/signup",async(req,res)=>{

    const data = req.body;
    const password = req.body.password;
    const confirmPass = req.body.confirmPassword;

    if(password!==confirmPass){
        res.json({code:1,msg: `Signup Failed Passwords are not matching`})
    }else{
        try{
            const newUser = new User(data);
            await newUser.save().then(()=>{
                res.json({msg: `Signup Successful and Data Stored in Database`})
            }).catch((err)=>{
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    }
})

app.post("/posttodo",async (req,res)=>{
    res.json({msg:`data came from react to node successfully`});
    // here we can see the data coming from the React file
    console.log(req.body)
    const todos = req.body.todos;
    const userid = req.body.userid;
    try{
        const getUser = await User.findByIdAndUpdate(userid, {todos: [...todos]})
        await getUser.save()
    }catch(err){
        console.log(err);
    }

    // it replacing the array with the new array and erase all the previous stored array
})

app.post("/gettodos",async(req,res)=>{
    const id = req.body.userid

    const getUser = await User.findById(id)
    console.log(getUser);
    res.json(getUser)
})

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`);
})