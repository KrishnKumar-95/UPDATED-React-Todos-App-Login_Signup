const mongoose = require("mongoose");

const uri = `mongodb://localhost:27017/reactTodoLogin`;

const connection = mongoose.connect(uri,{}).then(()=>{
    console.log("Connected Successfully");
}).catch((err)=>{
    console.log(err);
})

module.exports = connection;