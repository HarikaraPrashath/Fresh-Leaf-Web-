import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/UserPaymentController.js'

const router = express.Router();


router.post('/userInfoPaymentCreation', CreateDetails);
router.get('/userInfoPaymentGet', getAllDetails);
router.get('/userInfoPaymentGetOne/:id', getOneDetails);
router.put('/userInfoPaymentUpdate/:id', updateDetailsById);
router.delete('/userInfoPaymentDelete/:id', deleteDetailsById);

export default router;  

