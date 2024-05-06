import express from "express"   
import { CreateProductDetails, deleteProductDetailsById, getOneProductDetails, getProductDetails, updateProductDetailsById } from "../Controller/ProductAddController.js";

const router = express.Router();


router.post('/productCreate', CreateProductDetails);
router.get('/productGetAll', getProductDetails);
router.get('/productGetOne/:id', getOneProductDetails);
router.put('/productUpdate/:id', updateProductDetailsById);
router.delete('/productDelete/:id', deleteProductDetailsById);


export default router;