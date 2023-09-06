
// kechat gpt lay first do pagination then fil
import  express from "express";
import dotenv from 'dotenv'
import  CONNECTDB  from "./config/db.js"
//import {imageroute } from './routes/imageroute.js'
import cors from "cors"
import jobrouter from "./route/jobroute.js";
import userrouter from "./route/userroute.js";
import productrouter from "./route/productroute.js";
import newsrouter from "./route/newsroute.js";
import marketrouter from "./route/marketdata.js";
import contactrouter from "./route/contactroute.js";
dotenv.config();

const app=express();
app.use(express.json());

// we are telling this application will use only json to communicate
app.use(cors({
   origin: 'http://localhost:3000', // specify the URL of the client that can make requests
   methods: ['GET', 'POST','DELETE','PUT'], // specify the methods that are allowed
 }));
CONNECTDB();
const port=3001;


app.use('/user',userrouter)
app.use('/jobs',jobrouter)
app.use('/product',productrouter)
app.use('/news',newsrouter)
app.use('/market',marketrouter)
app.use('/contact',contactrouter)

app.listen(port,MEL);

function MEL(){
    
        console.log(`bro running ${port}`);
}