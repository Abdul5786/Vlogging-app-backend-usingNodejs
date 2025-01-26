import express from "express"
import {createUser,getAllUserList} from "../controllers/UserController.js"

 const routes = express.Router();

 routes.post("/create",createUser)
 routes.get("/all",getAllUserList)



export default routes;