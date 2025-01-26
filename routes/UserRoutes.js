import express from "express"
import {createUser,getAllUserList,updateUser,deleteUserById} from "../controllers/UserController.js"

 const routes = express.Router();

 routes.post("/create",createUser)
 routes.get("/all",getAllUserList)
 routes.put("/update/:id",updateUser)
 routes.delete("/delete/:id",deleteUserById)




export default routes;