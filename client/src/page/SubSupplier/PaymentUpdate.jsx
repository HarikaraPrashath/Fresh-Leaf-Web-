import React, { useEffect, useState } from "react";React;
import axios from "axios";
import Navbarl from "../../component/Navbarl";
import { useParams, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PaymentUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios.get(`http://localhost:3001/server/supplier/getPaymentDetails/${id}`)
      .then((result) => {
        setName(result.data.data.Card_Holder_Name);
        setBankName(result.data.data.Name_of_Bank);
        setNo(result.data.data.Card_Number);
        setCvc(result.data.data.cvc);
        setMonth(result.data.data.Expiry_Month);
        setYear(result.data.data.Expiry_Year);
        setBranch(result.data.data.Branch);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate input before submitting data
    if (!validate()) {
      return;
    }

    axios
      .put(`http://localhost:3001/server/supplier/PaymentUpdate/${id}`, {
        Card_Holder_Name,
        Name_of_Bank,
        Card_Number,
        cvc,
        Expiry_Month,
        Expiry_Year,
        Branch
      })
      .then((result) => {
        console.log(result);
        alert("Payment details successfully updated");
        navigate('/PaymentDisplay');
      })
      .catch((error) => {
        console.error('Payment details not updated:', error);
    });
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
    }

    // Validation for Card Number
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
    <div className="flex flex-row">
      <div className="w-[20%] h-[650px] flex-grow border  pl-[100px]">
        <div className="w-1/2 p-3 ml-[300px]">
          <div className="bg-gray-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4 font-serif text-center">
              Update Payment Details
            </h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-2 font-serif">
                <label htmlFor="Card_Holder_Name">Card_Holder_Name</label>
                <input
                  type="text"
                  placeholder="Enter the Card_Holder_Name"
                  className="w-full p-2 border rounded"
                  name="Card_Holder_Name"
                  value={Card_Holder_Name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.Card_Holder_Name && <span className="text-red-500">{errors.Card_Holder_Name}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Name_of_Bank">Name_of_Bank</label>
                <input
                  type="text"
                  placeholder="Enter the Name"
                  className="w-full p-2 border rounded"
                  name="Name_of_Bank"
                  value={Name_of_Bank}
                  onChange={(e) => setBankName(e.target.value)}
                />
                {errors.Name_of_Bank && <span className="text-red-500">{errors.Name_of_Bank}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Card_Number">Card_Number</label>
                <div className="flex items-center">
                  <input
                    type={showCardNumber ? "text" : "password"}
                    placeholder="Enter the Quantity"
                    className="w-full p-2 border rounded"
                    name="Card_Number"
                    value={Card_Number}
                    onChange={(e) => setNo(e.target.value)}
                  />
                  <button type="button" onClick={toggleShowCardNumber}>
                    {showCardNumber ? <FaEyeSlash /> : <FaEye />}
                    {showCardNumber ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.Card_Number && <span className="text-red-500">{errors.Card_Number}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="cvc">cvc</label>
                <div className="flex items-center">
                  <input
                    type={showCVC ? "text" : "password"}
                    placeholder="Enter the CVC"
                    className="w-full p-2 border rounded"
                    name="cvc"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                  <button type="button" onClick={toggleShowCVC}>
                    {showCVC ? <FaEyeSlash /> : <FaEye />}
                    {showCardNumber ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.cvc && <span className="text-red-500">{errors.cvc}</span>}
              </div>
              <div className='mb-2 font-serif flex flex-row'>
                <div className="mr-2">
                  <label htmlFor='Expiry_Month'>Card Validity:Expiry Month</label>
                  <select
                    className='w-full p-2 border rounded'
                    id='Expiry_Month'
                    name='Expiry_Month'
                    value={Expiry_Month}
                    onChange={(e) => setMonth(e.target.value)}
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
                    onChange={(e) => setYear(e.target.value)}
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
              <div className='mb-2 font-serif'>
                <label htmlFor='Branch'>Branch</label>
                <input
                  type='text'
                  placeholder='Branch'
                  className='w-full p-2 border rounded'
                  id='Branch'
                  name='Branch'
                  autoComplete='off'
                  value={Branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
              <div className="flex justify-center font-serif text-center">
                <button type="submit" className="rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950
  w-[150px] h-8 text-center
  text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
