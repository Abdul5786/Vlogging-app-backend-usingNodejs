import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import routes from './routes/UserRoutes.js';



const app = express();
app.use(bodyParser.json());

dotenv.config();

const Port = process.env.PORT|| 5000;

const mongo_URL = process.env.MONGO_URL ;

mongoose.connect(mongo_URL).then(()=>{
    console.log('Connected to DB')
    app.listen(Port,()=>{
        console.log(`serever is running on port${Port}`);
        
    })
}
    
).catch((err)=>
 console.log(err)
)

app.use("/api/user",routes)