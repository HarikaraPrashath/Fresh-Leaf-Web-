import express from 'express';
import { createPaymentDetails, getAllPaymentDetails, getPaymentDetails, deletePaymentDetailsById, updatePaymentDetailsById} from '../Controller/paymentController.js';

const route = express.Router();

route.post('/createPaymentDetails', createPaymentDetails);

route.get('/getPaymentDetails/:id', getPaymentDetails);

route.get('/getAllPaymentDetails', getAllPaymentDetails);

route.delete("/DeletePaymentDetails/:id", deletePaymentDetailsById);

route.put("/PaymentUpdate/:id", updatePaymentDetailsById);

export default route;
