import express from "express"   
import{Register,login,} from '../Controller/AuthController.js'

const router = express.Router();


router.post("/register", Register);
router.post("/login",login)
export default router;  