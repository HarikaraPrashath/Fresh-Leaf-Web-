import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/StaffPaymentDetailsController.js'

const router = express.Router();


router.post('/staffoayment', CreateDetails);
router.get('/staffpaymentgetall', getAllDetails);
router.get('/staffpaymentgetall/:id', getAllDetails);
router.put('/staffpaymentupdate/:id', updateDetailsById);
router.delete('/staffpaymentdelete/:id', deleteDetailsById);

export default router;  

