import Express  from "express";
import { upload } from "../controller/uploads.js";
import { addproduct, deleteproduct, getproduct, getproductbyuserid, updateproduct } from '../controller/productcontroller.js'
import { authenticate } from "../middleware/authenticate.js";
const productrouter=Express.Router();
//http://localhost:3000/addnews
productrouter.post('/addproduct',upload.single('image'),addproduct)
productrouter.get("/getproductbyuserid/",getproductbyuserid)
productrouter.get('/getproducts',getproduct)
productrouter.put('/updateproduct/:id',upload.single('image'),updateproduct)
productrouter.delete('/deleteproduct/:id',deleteproduct)
export default productrouter;