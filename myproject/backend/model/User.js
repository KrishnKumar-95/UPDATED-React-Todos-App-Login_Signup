const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    confirmPassword:{
        type:String,
        required:true,
        trim:true
    },
    todos:{
        type:Array,
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User;

// {
//     headings:[
//         {heading: String}
//     ],
//     position:{
//         type: Number
//     },
//     family:{
//         type: String
//     },
//     subtype:{
//         type: String
//     },
//     answers:{
//         choices:[
//             {text:String}
//         ]
//     }
// }