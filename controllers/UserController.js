import User from "../models/UserModel.js"


export const createUser = async(req,res)=>{

      try {

        const userData  = new User(req.body);
        const {email} =userData;

        const exist  = await User.findOne({email});

        if(exist)
        {
              return  res.status(400).json({message:"user already exist with this mail id"})
        }

                const savedUser = await userData.save();

                res.status(201).json({message:"user created succcessfully"})
        
      } catch (error) {

               res.status(500).json({error:"internal servor error" })

        
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
