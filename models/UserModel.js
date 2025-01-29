import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
     
     username:{
        type:String,
        require:true
       },

     email:{
        type:String,
        require:true
       },

       password:{
         type:String,
         require:true,
       },

    address:{
        type:String,
        require:true
       },

       role:{
         type:String,
         require:true,
         enum:["admin","manager","user"]
       },

       
      

},
   {
   timestamps:true
   }

)

export default mongoose.model("users",userSchema);