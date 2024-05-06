import express from "express";
import { CreateDetails,deleteDetailsById,getAllDetails,getOneDetails,updateDetailsById } from "../controller/UserFeedBackController.js";

const route = express.Router();

route.post("/create", CreateDetails);
route.get("/getall", getAllDetails);
route.get("/getone/:id", getOneDetails);
route.put("/update/:id", updateDetailsById);
route.delete("/delete/:id", deleteDetailsById);

export default route;