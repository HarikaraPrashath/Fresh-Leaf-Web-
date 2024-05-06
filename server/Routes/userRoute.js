import express from "express";
import { CreateDetails, getAllDetails, getOneDetails, updateDetailsById, deleteDetailsById } from "../Controller/userController.js";

const route = express.Router();

route.post("/CreateDetails", CreateDetails);
route.get("/getAllDetails", getAllDetails);
route.get("/getOneDetails/:id", getOneDetails);
route.put("/updateDetailsById/:id", updateDetailsById);
route.delete("/deleteDetailsById/:id", deleteDetailsById);

export default route;