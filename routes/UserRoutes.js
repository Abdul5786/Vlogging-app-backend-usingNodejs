import express from "express"
import {createUser,getAllUserList,updateUser,deleteUserById,userLogin} from "../controllers/UserController.js"
import { verifyToken } from "../middlewares/authmiddleware.js"

import { authorizeRoles } from "../middlewares/roleMiddleWare.js";
 const routes = express.Router();

 routes.post("/create",createUser)
 routes.get("/all",verifyToken,authorizeRoles("admin"),getAllUserList)
 routes.put("/update/:id",updateUser)
 routes.delete("/delete/:id",deleteUserById)
 routes.post("/login",userLogin)




export default routes;