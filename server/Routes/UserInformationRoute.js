import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/UserIformtionController.js'

const router = express.Router();


router.post('/userInfoCreation', CreateDetails);
router.get('/userInfoGet', getAllDetails);
router.get('/userInfoGetOne/:id', getOneDetails);
router.put('/userInfoUpdate/:id', updateDetailsById);
router.delete('/userInfoDelete/:id', deleteDetailsById);

export default router;  

