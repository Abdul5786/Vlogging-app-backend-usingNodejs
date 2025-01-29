import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();  // Load environment variables

export const createUser = async(req,res)=>{

              try {
                  
                  const{username,email,password,role,address}=req.body;
                  const hashPassword = await bcrypt.hash(password,10);

                  const existEmail=User.findOne({email});

                  if(existEmail)
                  {
                       return res.status(400).json({message:` user alreadu exist with this email id ${email}`})
                  }
   
                  const savedUser=  new User({username,password:hashPassword,role,email,address});
               
                  await savedUser.save();
   
                  return  res.status(201).json({message:` user registered successfully    ${username}`});
                  

              } catch (error) {

                  return res.status(500).json({message: ` internal servor error `});
                  
              }





}
    



     export const userLogin=async(req,res)=>{
                     
            try {
                  
                  const {email,password} = req.body;
                                 
               const userExist  = await User.findOne({email});
               if(!userExist)
               {
                     return res.status(400).json({message:`user not found with this email id : ${email}`})
               }

                  const isMatch=  await bcrypt.compare(password,  userExist.password);

                  if(!isMatch)
                  {
                        res.status(400).json({message:`invaid credentials`})
                  }
                     
                const token  =  jwt.sign({ id:userExist._id,role:userExist.role},
                  process.env.JWT_SECRET,
                        {
                              expiresIn:"1h"
                        }
                  );

                 
                  return res.status(200).json(token)

            } catch (error) {

                  return  res.status(500).json({message:"something went wrong"})
                  
            }


     }


export const getAllUserList= async(req,res)=>{
                  
      try {

           const listOfUser  =await User.find();
           if(listOfUser===null)
           {
                return res.status(400).json({message:"no users were found "})
           }

           return res.status(201).json(listOfUser)
       
      } catch (error) {

       return res.status(500).json({error:"internal servor error"})
       
      }
    
}


export const updateUser= async(req,res)=>{
                   
      try {


          const id= req.params.id;

                  // Check if the ID is provided
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }


                const userExist = await  User.findOne({_id:id});
                if(!userExist)
                {
                      return res.status(400).json({message:"user not found with this id"})
                }

               const updateUser =   await  User.findByIdAndUpdate(id,req.body,{new: true})
               
                return res.status(200).json(updateUser)
          
      } catch (error) {
          
          return res.status(500).json({error:"internal servor error"})
      }
                 
         
}


 export const deleteUserById= async (req,res)=>{

                              try {

                                    const id= req.params.id;

                                    // Check if the ID is provided
                                         if (!id) {
                                          return res.status(400).json({ message: "User ID is required" });
                                      }


                                    const userExist = await  User.findOne({_id:id});

                                     if(!userExist)
                                     {
                                          return res.status(400).json({message:"user not exist by this id"})
                                     }

                                          await User.deleteUserById(id);
                                          res.status(200).json({message:"user deleted succesfully"})
                                            
                                    
                              } catch (error) {

                                    return res.status(500).json({error:"internal servor error"})
                                    
                              }
 }