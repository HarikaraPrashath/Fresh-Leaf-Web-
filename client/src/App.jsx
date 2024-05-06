import './App.css'
import Home from './page/Home'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Register from './page/Register'
import Login from './page/Login'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ShipmentAccount from './page/ShipmentAccount'


import MarketingAccout from './page/MarketingAccout'
import MarketingUpdateActivity from './page/SubMarketingPage/AddMarketingUpdate.jsx'
import MarketingAddActivity from './page/SubMarketingPage/AddMarketing.jsx'
import MarketingProfile from './page/SubMarketingPage/MarktingProfilPage.jsx'
import MarketingProfileUpdate from './page/SubMarketingPage/MarketingUpdateProfile.jsx'
import PaymentAddMarketing from './page/SubMarketingPage/PaymentAddMarketing.jsx'
import PaymentUpdateMarketing from './page/SubMarketingPage/PaymentUpdateMarketing.jsx'
import MarketingDetailsShowpage from './page/OwnerPage/MarketingInfo.jsx'


// all the staffManager link
import StaffManagerAccount from './page/StaffManagerAccount'
import StaffManagerDteailsUpdate from './page/SubStaffManager/StaffManagerDteailsUpdate.jsx'
import PaymentInforStaffMan from './page/SubStaffManager/PaymentforStaffMan'
import StaffManagerPaymentUpdate from './page/SubStaffManager/StaffManagerPaymentUpdate.jsx'
import StaffManagerAccountShowDetails from './page/SubStaffManager/staffManagerDetailsShow.jsx'
import AllStaffGet from './page/SubStaffManager/AllStaffGet'
import AllStaffCreate from './page/SubStaffManager/AllStaffCreate.jsx'
import AllStaffUpdatePage from './page/SubStaffManager/AllStaffUpdatePage.jsx'
import Responce from './page/SubStaffManager/Responce'

import StaffAccount from './page/StaffAccount'
import PaymentInforStaff from './page/SubStaffPage/PaymentInforStaff'
import PaymentInforStaffUpdate from './page/SubStaffPage/PaymentUpdateStaff.jsx'
import Request from './page/SubStaffPage/Request'
import StaffUpdate from'./page/SubStaffPage/StaffUpdate.jsx'
import StaffProfileShowInfor from'./page/SubStaffPage/ShowDataStaffInforProfil.jsx'

import UserAccount from './page/UserAccount'
import UserInformationAdd from './page/UserAccount.jsx'
import UserAccountUpdate from './page/SubUserInformation/UserInformationUpdate.jsx'
import UserPayment from './page/SubUserInformation/UserPayment.jsx'
import UserPaymentUpdate from './page/SubUserInformation/UserPaymentUpdate.jsx'
import UserFeedBack from './page/SubUserInformation/userFeedBack.jsx'
import UserProduct from './page/SubUserInformation/UserProduct.jsx'
import UserPromotion from './page/SubUserInformation/UserPromotion.jsx'
import UserFeedBackAdd from './page/SubUserInformation/UserFeedBackAddPage.jsx'
import UserFeedBackUpdate from './page/SubUserInformation/UserFeedBackUpdatePage.jsx'

import OwnerPage from './page/OwnerPage'

import InventryAddtoform from './page/SubInventoryPages/InventryAddtoform.jsx'
import InventryProfile from './page/SubInventoryPages/InventryProfile.jsx'
import InventryAnalytics from './page/SubInventoryPages/InventryAnalytics.jsx'
import InventryCalculation from './page/SubInventoryPages/InventryCalculation.jsx'

import InventryCreateForm from '../src/page/SubInventoryPages/InventrySup/InventryCreateForm.jsx'
import InventryCreateProfile from '../src/page/SubInventoryPages/InventrySup/InventryCreateProfile.jsx'
import InventryUpdateform from '../src/page/SubInventoryPages/InventrySup/InventryUpdateform.jsx'




import Contact from './page/Contact'
import About from './page/About'


import StaffInforClient from '../src/page/OwnerPage/StaffInfor.jsx'; 

import ProductShow from './page/ProductShowPage.jsx'
import Cardpay from '../src/page/Cardpay.jsx';
import  CashD from '../src/page/CashD';

import Order  from '../src/page/Order.jsx'; // Use named import
import Page_one from '../src/page/Page_one';
import Page_two from '../src/page/Page_two';
import Pagethree from '../src/page/Page_three';

import Shipment from '../src/page/Shipment';
import Customer from '../src/page/Customer';
import Seeproduct from '../src/page/Seeproduct';

//supplier

import Supplier_createProduct from './page/SubSupplier/Supplier_createProduct';
import ProductDetails from './page/ProductDetails';
import Payment from './page/SubSupplier/Payment';
import Profile from './page/SubSupplier/Profile'; 
import Supplier_updateProduct from './page/SubSupplier/Supplier_updateProduct';
import ProfileDisplay from './page/ProfileDisplay'; 
import PaymentDisplay from './page/PaymentDisplay';
import UpdateProfileDetails from './page/SubSupplier/UpdateProfileDetails';
import PaymentUpdate from './page/SubSupplier/PaymentUpdate';
import CalculateTotalPrice from './page/SubSupplier/CalculateTotalPrice';
import SupplierInfo from './page/OwnerPage/SupplierInfo';

import MarketingInfo from './page/OwnerPage/MarketingInfo.jsx'



function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path='/shipmentAccount' element={<ShipmentAccount/>}/>
    <Route path='/marketingAccount' element={<MarketingAccout/>}/>



    <Route path='/staffManagerAccount' element={<StaffManagerAccount/>}/>
    <Route path='/StaffManagerAccountShowDetails' element={<StaffManagerAccountShowDetails/>}/>
    <Route path='/StaffManagerDteailsUpdate/:id' element={<StaffManagerDteailsUpdate/>}/>
    <Route path='/PaymentInforStaffMan' element={<PaymentInforStaffMan/>}/>
    <Route path='/StaffManagerPaymentUpdate/:id' element={<StaffManagerPaymentUpdate/>}/>
    <Route path='/AllStaffGet' element={<AllStaffGet/>}/>
    <Route path='/AllStaffCreate' element={<AllStaffCreate/>}/>
    <Route path='/AllStaffUpdatePage/:id' element={<AllStaffUpdatePage/>}/>
    <Route path='/Responce' element={<Responce/>}/>




    <Route path='/staffAccount' element={<StaffAccount/>}/>
    <Route path='/PaymentInforStaff' element={<PaymentInforStaff/>}/>
    <Route path='/staffpaymentupdate/:id' element={<PaymentInforStaffUpdate/>}/>
    <Route path='/request' element={<Request/>}/>
    <Route path='/staffupdate/:id' element={<StaffUpdate/>}/>
    <Route path='/StaffProfileShowInfor' element={<StaffProfileShowInfor/>}/>



    <Route path='/userAccount' element={<UserAccount/>}/>
    <Route path='/UserInformationAdd' element={<UserInformationAdd/>}/>
   <Route path='/userAccountUpdate/:id' element={<UserAccountUpdate/>}/>
    <Route path='/userPayment' element={<UserPayment/>}/>
    <Route path='/userPaymentUpdate/:id' element={<UserPaymentUpdate/>}/>
    <Route path='/UserProduct' element={<UserProduct/>}/>
    <Route path='/UserFeedBack' element={<UserFeedBack/>}/>
    <Route path='/UserFeedBackAdd' element={<UserFeedBackAdd/>}/>
    <Route path='/UserFeedBackUpdate/:id' element={<UserFeedBackUpdate/>}/>

    <Route path='/UserPromotion' element={<UserPromotion/>}/>




    <Route path='/OwnerPage' element={<OwnerPage/>}/>

    {/* <Route path='/OwnerDashboard' element={<OwnerDashboard/>}/> */}

    <Route path='/inventroyAddtoForms' element={<InventryAddtoform/>}/>
    <Route path='/inventryProfile' element={<InventryProfile/>}/>
    <Route path='/inventryAnalytics' element={<InventryAnalytics/>}/>
    <Route path='/inventryCalculation' element={<InventryCalculation/>}/>
    <Route path='/inventryCreateForm' element={<InventryCreateForm/>}/>
    <Route path='/inventryCreateProfile/:id' element={<InventryCreateProfile/>}/>
    <Route path='/inventryUpdateform/:id' element={<InventryUpdateform/>}/>

    <Route path='/mainProducts' element={<ProductShow/>}/>
 
    <Route path='/MarketingPage' element={<MarketingAccout/>}/>
    <Route path='/MarketingAddActivity' element={<MarketingAddActivity/>}/>
    <Route path='/MarketingUpdateActivity/:id' element={<MarketingUpdateActivity/>}/>
    <Route path='/MarketingProfile' element={<MarketingProfile/>}/>
    <Route path='/MarketingUpdateProfile/:id' element={<MarketingProfileUpdate/>}/>
    <Route path='/paymentAddMarketing' element={<PaymentAddMarketing/>}/>
    <Route path='/PaymentUpdateMarketing/:id' element={<PaymentUpdateMarketing/>}/>
    <Route path='/MarketingDetailsShowpage' element={<MarketingDetailsShowpage/>}/>
    <Route path='/MarketingInfo' element={<MarketingInfo/>}/>

    


    <Route path='/mainProducts' element={<ProductShow />} />
    <Route path='/Seeproduct' element={<Seeproduct />} />
    <Route path='/Order' element={<Order/>} />
    <Route path='/Cardpay' element={<Cardpay/>}/>
    <Route path='/CashD' element={<CashD/>}/>

    <Route path='/pageone' element={<Page_one/>} />
    <Route path='/pagetwo' element={<Page_two/>}/>
    <Route path='/pagethree/:id' element={<Pagethree/>}/>

    <Route path='/Shipment' element ={<Shipment/>}/>
    <Route path = '/Customer' element = {<Customer/>}/>

    
    <Route path = '/StaffInforClient' element = {<StaffInforClient/>}/>




    <Route path="/profile" element={<Profile />} />
    <Route path="/supplierAccount" element={<ProfileDisplay />} /> 
    <Route path="/productdetails" element={<ProductDetails />} />
    <Route path="/createproduct" element={<Supplier_createProduct/> } />
    <Route path="/paymentdetails" element={<Payment/>} />
    <Route path="/updateproduct/:id" element={<Supplier_updateProduct/>} />

     <Route path="/paymentdisplay" element={<PaymentDisplay />} />
     <Route path="/UpdateProfileDetails/:id" element={<UpdateProfileDetails/>} />
     <Route path="/PaymentUpdate/:id" element={<PaymentUpdate/>} />
     <Route path="/CalculateTotalPrice" element={<CalculateTotalPrice/>} />

     <Route path="/SupplierInfo" element={<SupplierInfo/>} />
    



    </Routes>
    </BrowserRouter>
  )
}

export default App
