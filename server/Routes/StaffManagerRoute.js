import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/StaffManagerDetailsController.js'

const router = express.Router();


router.post('/staffManagerDetails', CreateDetails);
router.get('/staffManagerGetAll', getAllDetails);
router.get('/staffManagerGetOne/:id', getOneDetails);
router.put('/staffManagerupdate/:id', updateDetailsById);
router.delete('/staffManagerDelete/:id', deleteDetailsById);

export default router;  

