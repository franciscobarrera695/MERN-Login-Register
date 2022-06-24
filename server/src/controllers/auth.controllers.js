import User from '../models/User.js'

import { getToken } from '../config/jwt.config.js'

export const register = async(req,res) => {
  
 try {
    const {name,email,password} = req.body
    const emailDb = User.findOne({ email: email });
    if(emailDb){
      return res.status(400).json({message:'existed user!'})
    }
    const user = new User({name,email,password})
    
    user.password = await user.encryptPassword(user.password);
    console.log('asas')
    await user.save()
    res.status(200).json({message:'create success!'})
 } catch (error) {
     res.status(500).json({message:error.message})
 }

}
export const login = async(req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({ email: email });
    if(!user){
        return res.status(404).json({message:'user not found'})
    }
    const validatePasswordDb = await user.validatePassword(password)
    if(!validatePasswordDb){
      return res.status(404).json({message:'user not found 2'})
    }
    const token = getToken(user)
    res.status(200).json({user,token})

}
export const profile = async(req,res) => {
    try {
      
        const user = await User.findById(req.user.data);
        if (!user) {
          return res.status(404).json({ message: "No User Found" });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
