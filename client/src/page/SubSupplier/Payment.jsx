import React, { useState } from "react";React;
import Navbarl from "../../component/Navbarl";
import { Link } from "react-router-dom";
import axios from 'axios';
import Footer from '../../component/Footer';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [Card_Holder_Name, setName] = useState('');
  const [Name_of_Bank, setBankName] = useState('');
  const [Card_Number, setNo] = useState('');
  const [cvc, setCvc] = useState('');
  const [Expiry_Month, setMonth] = useState('');
  const [Expiry_Year, setYear] = useState('');
  const [Branch, setBranch] = useState('');
  const [showCVC, setShowCVC] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/server/supplier/createPaymentDetails', {
        Card_Holder_Name,
        Name_of_Bank,
        Card_Number,
        cvc,
        Expiry_Month,
        Expiry_Year,
        Branch
      });

      if (response.status === 201) {
          console.log(response.data);
          alert('Payment details created successfully!');
          navigate('/PaymentDisplay');
      } else {
          throw new Error(response.statusText || 'Failed to create payment details');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        const validationErrors = error.response.data.errors.join('\n');
        alert('Validation errors:\n' + validationErrors);
      } else {
        console.error('Error creating payment details:', error.message);
        alert('Failed to create payment details. Please try again.');
      }
    }
  };

  const toggleShowCVC = () => {
    setShowCVC(!showCVC);
  };

  const toggleShowCardNumber = () => {
    setShowCardNumber(!showCardNumber);
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    // Validation for Card Holder Name
    if (!Card_Holder_Name) {
      errors.Card_Holder_Name = "Card holder name is required";
      isValid = false;
    } else if (!/^[a-zA-Z. ]+$/.test(Card_Holder_Name)) {
      errors.Card_Holder_Name = "Card holder name should contain only letters and dots";
      isValid = false;
    }

    // Validation for Bank Name
    if (!Name_of_Bank) {
      errors.Name_of_Bank = "Bank name is required";
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(Name_of_Bank)) {
      errors.Name_of_Bank = "Bank name should contain only letters";
      isValid = false;
    }

    // Validation for Card Numberr
    if (!Card_Number) {
      errors.Card_Number = "Card number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(Card_Number)) {
      errors.Card_Number = "Card number should contain exactly 16 numbers";
      isValid = false;
    }

    // Validation for CVC
    if (!cvc) {
      errors.cvc = "CVC is required";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(cvc)) {
      errors.cvc = "CVC should contain exactly 3 or 4 numbers";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  
  
  return (
    <>
    <div>
      <Navbarl />
      <div className='flex justify-between mt-4 px-14'></div>
    </div>
    <div className='flex flex-row'>
        <div className="flex w-[300px] h-[650px] bg-lime-900 ">
        <div className="p-5">
        <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
        <Link to="/supplierAccount">Profile</Link>
        </button>
        <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/productdetails">Product Details</Link></button>
        
        <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/createproduct">Product History</Link></button>
        
        <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/PaymentDisplay">Payment Details</Link></button>
        </div>
      </div>
      <div className="w-[20%] h-[650px] flex-grow border">
        <div className="w-1/2 p-3 ml-[300px]">
          <div className="bg-gray-200 rounded-lg p-4">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4 font-serif text-center">Payment Details</h2>
              <div className="mb-2 font-serif">
                <label htmlFor="Card_Holder_Name">Card Holder Name</label>
                <input
                  type="text"
                  placeholder="Enter the Card holder name"
                  className="w-full p-2 border rounded"
                  id="Card_Holder_Name"
                  name="Card_Holder_Name"
                  autoComplete='off'
                  value={Card_Holder_Name}
                  onChange={(e) => { setName(e.target.value) }}
                />
                {errors.Card_Holder_Name && <span className="text-red-500">{errors.Card_Holder_Name}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Name_of_Bank">Name of Bank</label>
                <input
                  type="text"
                  placeholder="Enter the Name of the bank"
                  className="w-full p-2 border rounded"
                  id="Name_of_Bank"
                  name="Name_of_Bank"
                  autoComplete='off'
                  value={Name_of_Bank}
                  onChange={(e) => { setBankName(e.target.value) }}
                />
                {errors.Name_of_Bank && <span className="text-red-500">{errors.Name_of_Bank}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Card_Number">Card Number</label>
                <div className="flex items-center">
                  <input
                    type={showCardNumber ? "text" : "password"}
                    placeholder="Enter the Card Number"
                    className="w-full p-2 border rounded"
                    id="Card_Number"
                    name="Card_Number"
                    autoComplete='off'
                    value={Card_Number}
                    onChange={(e) => { setNo(e.target.value) }}
                  />
                  <button type="button" onClick={toggleShowCardNumber}>
                    {showCardNumber ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.Card_Number && <span className="text-red-500">{errors.Card_Number}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="cvc">CVC</label>
                <div className="flex items-center">
                  <input
                    type={showCVC ? "text" : "password"}
                    placeholder="Enter the CVC"
                    className="w-full p-2 border rounded"
                    id="cvc"
                    name="cvc"
                    autoComplete='off'
                    value={cvc}
                    onChange={(e) => { setCvc(e.target.value) }}
                  />
                  <button type="button" onClick={toggleShowCVC}>
                    {showCVC ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.cvc && <span className="text-red-500">{errors.cvc}</span>}
              </div>
              <div className="mb-2 font-serif flex flex-row">
                <div className="mr-2">
                  <label htmlFor="Expiry_Month">Card Validity: Expiry Month</label>
                  <select
                    className="p-2 border rounded"
                    id="Expiry_Month" name="Expiry_Month" 
                    value={Expiry_Month}
                    onChange={(e) =>{setMonth(e.target.value)}}
                  >
                    <option value="">Month</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Expiry_Year">Year</label>
                  <select
                    className="p-2 border rounded"
                    id="Expiry_Year" name="Expiry_Year" 
                    value={Expiry_Year}
                    onChange={(e) =>{setYear(e.target.value)}}
                  >
                    <option value="">Year</option>
                    <option value="1">2024</option>
                    <option value="2">2025</option>
                    <option value="3">2026</option>
                    <option value="4">2027</option>
                    <option value="5">2028</option>
                    <option value="6">2029</option>
                    <option value="7">2030</option>
                  </select>
                </div>
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="">Branch</label>
                <input
                  type="text"
                  placeholder="Enter the Bank Branch"
                  className="w-full p-2 border rounded"
                  id="Branch"
                  name="Branch"
                  autoComplete='off'
                  value={Branch}
                  onChange={(e) => { setBranch(e.target.value) }}
                />
              </div>
              <div className="flex flex-row justify-center font-serif text-center">
                <button className=' rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950
  w-[150px] h-8 text-center
  text-white ml-4'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}
