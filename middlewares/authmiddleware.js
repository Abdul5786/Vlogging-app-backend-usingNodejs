import jwt from "jsonwebtoken"
import dotenv from 'dotenv'


export const verifyToken= (req,res,next)=>{

                              let authHeader = req.headers.Authorization || req.headers.auth

                              if(authHeader && authHeader.startsWith("Bearer"))
                              {
                                     token= authHeader.split("")[1];

                                     if(!token)
                                     {
                                         return res.status(401).json({message:"No token ,authorization denied "})
                                     }
                              }


                              try {

                                   const decode=jwt.verify(token,process.env.JWT_SECRET);
                                   req.user=decode;

                                
                              } catch (error) {

                                return res.status(401).json({message:" token invalid "})
                                
                              }



}