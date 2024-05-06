import React, { useState } from "react";React;
import axios from 'axios';
import { Link } from "react-router-dom";
import Navbarl from "../../component/Navbarl";
import Footer from '../../component/Footer';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [Id, setID] = useState("");
  const [Name, setName] = useState("");
  const [Email_address, setEmail_address] = useState("");
  const [Contact_No, setContact_No] = useState("");
  const [NIC_number, setNIC_number] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showId, setShowId] = useState(false);
  const [existingEmails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post("http://localhost:3001/server/supplier/createProfile", {
          Id,
          Name,
          Email_address,
          Contact_No,
          NIC_number,
        });

        if (response.status === 201) {
          console.log(response.data);
          alert("Profile details created successfully!");
          navigate("/supplierAccount");
        } else {
          throw new Error(response.statusText || "Failed to create profile details");
        }
      } catch (error) {
        const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error("Error creating profile details:", errorMessage);
        alert("Failed to create profile details. Please try again.");
      }
    }
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!Id) {
      errors.Id = "ID is required";
      isValid = false;
    } else if (!/^\d+$/.test(Id)) {
      errors.Id = "ID should contain only numbers";
      isValid = false;
    }

    if (!/^[a-zA-Z. ]+$/.test(Name)) {
      errors.Name = "Name should contain only letters and dots";
      isValid = false;
    }

    // Validation for Email Address
    if (!Email_address) {
      errors.Email_address = "Email address is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(Email_address)) {
      errors.Email_address = "Invalid email address. Must be a Gmail address";
      isValid = false;
    } else if (existingEmails.includes(Email_address)) {
      errors.Email_address = "This email address is already in use. Please enter a different one.";
      isValid = false;
    }

    if (!Contact_No) {
      errors.Contact_No = "Contact No. is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(Contact_No)) {
      errors.Contact_No = "Contact number should contain exactly 10 numbers";
      isValid = false;
    }

    if (!NIC_number) {
      errors.NIC_number = "NIC number is required";
      isValid = false;
    } else if (!/^[\dVv]+$/.test(NIC_number)) {
      errors.NIC_number = "NIC number should contain numbers and the letter 'V' only";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const toggleShowId = () => {
    setShowId(!showId);
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
                <h2 className="text-2xl font-bold mb-4 font-serif text-center">Profile</h2>
                
                <div className="mb-2 font-serif">
                  <label htmlFor="Id">ID</label>
                  <div className="flex items-center">
                    <input
                      type={showId ? "text" : "password"}
                      placeholder="Enter your Id"
                      className="w-full p-2 border rounded"
                      value={Id}
                      onChange={(e) => setID(e.target.value)}
                      id="Id"
                      name="Id"
                      autoComplete='off'
                    />
                    <button type="button" onClick={toggleShowId}>
                      {showId ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.Id && <span className="text-red-500">{errors.Id}</span>}
                </div>

                <div className="mb-2 font-serif">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter the Name"
                    className="w-full p-2 border rounded"
                    id="Name"
                    name="Name"
                    autoComplete='off'
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.Name && <span className="text-red-500">{errors.Name}</span>}
                </div>

                <div className="mb-2 font-serif">
                  <label htmlFor="Email_address">Email address</label>
                  <input
                    type="text"
                    placeholder="Enter the Email address"
                    className={`w-full p-2 border rounded ${errors.Email_address ? 'border-red-500' : ''}`}
                    name="Email_address"
                    value={Email_address}
                    onChange={(e) => setEmail_address(e.target.value)}
                  />
                  {errors.Email_address && <span className="text-red-500">{errors.Email_address}</span>}
                </div>

                <div className="mb-2 font-serif">
                  <label htmlFor="Contact_No">Contact No.</label>
                  <input
                    type="text"
                    placeholder="Enter the Phone number"
                    className="w-full p-2 border rounded"
                    id="Contact_No"
                    name="Contact_No"
                    autoComplete='off'
                    value={Contact_No}
                    onChange={(e) => setContact_No(e.target.value)}
                  />
                  {errors.Contact_No && <span className="text-red-500">{errors.Contact_No}</span>}
                </div>

                <div className="mb-2 font-serif">
                  <label htmlFor="NIC_number">NIC number</label>
                  <input
                    type="text"
                    placeholder="Enter the NIC Number"
                    className="w-full p-2 border rounded"
                    id="NIC_number"
                    name="NIC_number"
                    autoComplete='off'
                    value={NIC_number}
                    onChange={(e) => setNIC_number(e.target.value)}
                  />
                  {errors.NIC_number && <span className="text-red-500">{errors.NIC_number}</span>}
                </div>

                <div className='flex flex-row justify-center font-serif text-center'>
                  <button className='rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950 w-[150px] h-8 text-center text-white ml-4'>Submit</button>
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
