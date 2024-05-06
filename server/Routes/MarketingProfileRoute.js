import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/MraketingProfileController.js'

const router = express.Router();


router.post('/MarketingProfileCreate', CreateDetails);
router.get('/MarketingProfileGetAll', getAllDetails);
router.get('/MarketingProfileGetOne/:id', getOneDetails);
router.put('/MarketingProfileUpdate/:id', updateDetailsById);
router.delete('/MarketingProfileDelete/:id', deleteDetailsById);


export default router;  