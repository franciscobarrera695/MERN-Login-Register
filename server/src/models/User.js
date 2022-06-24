import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const {Schema,model} = mongoose
const user = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

user.methods.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

user.methods.validatePassword = function async(password){
    return bcrypt.compare(password,this.password)
  }


export default model('User',user)