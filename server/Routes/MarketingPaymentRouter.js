import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/MarketingPaymentController.js'

const router = express.Router();


router.post('/Marketingpaymentcreate', CreateDetails);
router.get('/Marketingpaymentgetall', getAllDetails);
router.get('/MarketingpaymentgetOne/:id', getOneDetails);
router.put('/Marketingpaymentupdate/:id', updateDetailsById);
router.delete('/Marketingpaymentdelete/:id', deleteDetailsById);

export default router;  
