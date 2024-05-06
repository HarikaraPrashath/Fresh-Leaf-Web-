import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/DetailsController.js'

const router = express.Router();


router.post('/details', CreateDetails);
router.get('/detailsget', getAllDetails);
router.get('/detailsGetOne/:id', getAllDetails);
router.put('/detailsupdate/:id', updateDetailsById);
router.delete('/detailsdelete/:id', deleteDetailsById);

export default router;  

