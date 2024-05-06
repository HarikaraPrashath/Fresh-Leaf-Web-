import express from "express"   
import{CreateDetails,getAllDetails,updateDetailsById,deleteDetailsById,getOneDetails} from '../Controller/InventryAddController.js'

const router = express.Router();


router.post('/inventoryCreate', CreateDetails);
router.get('/inventoryGetAll', getAllDetails);
router.get('/inventoryGetOne/:id', getOneDetails);
router.put('/inventoryUpdate/:id', updateDetailsById);
router.delete('/inventoryDelete/:id', deleteDetailsById);


export default router;  