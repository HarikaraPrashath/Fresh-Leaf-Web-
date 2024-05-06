import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/StaffManagerPaymentController.js'

const router = express.Router();


router.post('/staffManagerPaymentDetails', CreateDetails);
router.get('/staffManagerPaymentGetAll', getAllDetails);
router.get('/staffManagerPaymentGetAll/:id', getOneDetails);
router.put('/staffManagerPaymentupdate/:id', updateDetailsById);
router.delete('/staffManagerPaymentDelete/:id', deleteDetailsById);

export default router;  

