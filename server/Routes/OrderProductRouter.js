import express from "express"   
import { CreateOrderProductDetails, deleteOrderProductDetailsById, getOneOrderProductDetails, getOrderAllProductDetails, updateOrderProductDetailsById } from "../Controller/OrderProductController.js";

const router = express.Router();


router.post('/CreateOrderProductDetails',  CreateOrderProductDetails);
router.get('/OrderproductGetAll', getOrderAllProductDetails);
router.get('/OrderproductGetOne/:id', getOneOrderProductDetails);
router.put('/OrderproductUpdate/:id', updateOrderProductDetailsById);
router.delete('/OrderproductDelete/:id', deleteOrderProductDetailsById);


export default router;