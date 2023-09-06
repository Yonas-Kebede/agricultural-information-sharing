import Express  from "express";
import { getphone, registerphone } from "../controller/contactcontroller.js";

const contactrouter=Express.Router();
//http://localhost:3005/contact/addphone
contactrouter.post("/addphone",registerphone)
contactrouter.get("/getphone",getphone)

export default contactrouter;