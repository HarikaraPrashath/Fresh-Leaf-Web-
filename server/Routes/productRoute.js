import express from "express";
import { CreateProductDetails, getAllProductDetails, getOneProductDetail, updateProductDetailsById, deleteProductDetailsById} from "../Controller/productController.js";

const route = express.Router();

route.post("/supplierCreate", CreateProductDetails);
route.get("/supplierGetall", getAllProductDetails);
route.get("/supplierGetone/:id", getOneProductDetail);
route.put("/supplierUpdate/:id", updateProductDetailsById);
route.delete("/supplierDelete/:id", deleteProductDetailsById);



export default route;