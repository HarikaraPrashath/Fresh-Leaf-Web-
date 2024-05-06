import express from 'express';
import { connect } from 'mongoose';
import authRouter from './Routes/AuthRoute.js';
import details from './Routes/DetailsRouts.js';
import staffpayment from './Routes/StaffPaymentRoute.js';
import RequestSaffRoute from './Routes/RequestSaffRoute.js';
import StaffManagerRoute from './Routes/StaffManagerRoute.js';
import StaffManagerPaymentRoute from './Routes/StaffManagerPaymentRoute.js';
import StaffManagerStaffDetailsRoutes from './Routes/StaffManagerStaffDetailsRoutes.js';
import userInfor from './Routes/UserInformationRoute.js';
import userInforPayment from './Routes/UserInforPaymentRoute.js';
import inventoryApi from '../server/Routes/InventroyRoute.js';
import inventoryProfileApi from '../server/Routes/InventoryProfileRoute.js'
import MarketingActivity from '../server/Routes/userRoute.js'
import MarketingProfile from '../server/Routes/MarketingProfileRoute.js'
import MarketingPaymentDetails from '../server/Routes/MarketingPaymentRouter.js'
import FeedBackUser from '../server/Routes/UserFeedBaackRouter.js'
import supplierApi from './Routes/productRoute.js'
import supplierProfileApi from './Routes/profileRoute.js'
import supplierPaymentDetailsApi from './Routes/paymentRoute.js'


// import productApi from '../server/Router/ProductRouter.js';
import productApi from '../server/Routes/ProductRouter.js';
import  productOrderApi from'../server/Routes/OrderProductRouter.js';

import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json())

connect('mongodb://localhost:27017/FreshLeaf');

 
app.use('/server/auth',authRouter)
app.use('/server/details',details)
app.use('/server/staffpayment',staffpayment)
app.use('/server/staffRequest',RequestSaffRoute)
app.use('/server/StaffManager',StaffManagerRoute)
app.use('/server/StaffManagerPaymentRoute',StaffManagerPaymentRoute)
app.use('/server/StaffInfo',StaffManagerStaffDetailsRoutes)
app.use('/server/userInfo',userInfor)
app.use('/server/userInfoPayment',userInforPayment)
app.use('/server/inventoryapi',inventoryApi)
app.use('/server/inventoryProfile',inventoryProfileApi)
app.use('/server/MarketingActivity',MarketingActivity)
app.use('/server/MarketingPrserverofile',MarketingProfile)
app.use('/server/MarketingPayment',MarketingPaymentDetails)
app.use('/server/FeedBackUser',FeedBackUser)
app.use("/server/supplier", supplierApi);
app.use("/server/supplier", supplierProfileApi);
app.use("/server/supplier", supplierPaymentDetailsApi);


app.use('/server/Productmanage', productApi);
app.use('/server/Productmanage',  productOrderApi); 

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
