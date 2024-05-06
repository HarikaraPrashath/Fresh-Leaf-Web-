import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/StaffManagerStaffDetailsController.js'

const router = express.Router();


router.post('/detailsStaffInfo', CreateDetails);
router.get('/detailsStaffInfogetAll', getAllDetails);
router.get('/detailsStaffInfoGetOne/:id', getAllDetails);
router.put('/detailsStaffInfoupdate/:id', updateDetailsById);
router.delete('/detailsStaffInfodelete/:id', deleteDetailsById);

export default router;  

