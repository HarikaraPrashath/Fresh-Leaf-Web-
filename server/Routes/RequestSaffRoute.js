import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/RequestStaffController.js'

const router = express.Router();


router.post('/requestDetailsStaff', CreateDetails);
router.get('/requestGetAll', getAllDetails);
router.get('/requestGetOne/:id', getOneDetails);
router.put('/detailsupdate/:id', updateDetailsById);
router.delete('/requestDelete/:id', deleteDetailsById);

export default router;  

