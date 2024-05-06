import React, { useEffect, useState } from "react";React;
import axios from "axios";
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import Navbarl from "../../component/Navbarl";

export default function UpdateProfileDetails() {
  const { id } = useParams(); 

  const [Id, setID] = useState('');
  const [Name, setName] = useState('');
  const [Email_address, setEmail_address] = useState('');
  const [Contact_No, setContact_No] = useState('');
  const [NIC_number, setNIC_number] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showId, setShowId] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/server/supplier/getOneProfile/${id}`)
      .then((result) => {
        const data = result.data.data;
        setID(data.Id);
        setName(data.Name);
        setEmail_address(data.Email_address);
        setContact_No(data.Contact_No);
        setNIC_number(data.NIC_number);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.put(`http://localhost:3001/server/supplier/UpdateProfileDetails/${id}`, {
        Id,
        Name,
        Email_address,
        Contact_No,
        NIC_number
      })
      .then((result) => {
        console.log(result);
        alert("Profile details successfully updated");
        navigate('/supplierAccount');
      })
      .catch((error) => {
        console.error('Profile not updated:', error);
      });
    }
  };

  const toggleShowId = () => {
    setShowId(!showId);
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

    if (!Name) {
      errors.Name = "Name is required";
      isValid = false;
    }

    if (!Email_address) {
      errors.Email_address = "Email address is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(Email_address)) {
      errors.Email_address = "Invalid email address. Must be a Gmail address";
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
  
  return (
    <>
        <div>
        <Navbarl />
        <div className='flex justify-between mt-4 px-14'>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-[20%] h-[650px] flex-grow border  pl-[100px]">
          <div className="w-1/2 p-3 ml-[300px]">
            <div className="bg-gray-200 rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4 font-serif text-center">
                Update Profile
              </h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-2 font-serif">
                  <label htmlFor="Id">ID</label>
                  <div className="flex items-center">
                    <input
                      type={showId ? "text" : "password"}
                      placeholder="Enter your Id"
                      className="w-full p-2 border rounded"
                      value={Id}
                      onChange={(e) => setID(e.target.value)}
                      name="Id"
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
                    name="Name"
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
                  <label htmlFor="Contact_No">Contact Number</label>
                  <input
                    type="text"
                    placeholder="Enter the Contact No."
                    className="w-full p-2 border rounded"
                    name="Contact_No"
                    value={Contact_No}
                    onChange={(e) => setContact_No(e.target.value)}
                  />
                  {errors.Contact_No && <span className="text-red-500">{errors.Contact_No}</span>}
                </div>
                <div className="mb-2 font-serif">
                  <label htmlFor="NIC_number">NIC Number</label>
                  <input
                    type="text"
                    placeholder="Enter the NIC number"
                    className="w-full p-2 border rounded"
                    name="NIC_number"
                    value={NIC_number}
                    onChange={(e) => setNIC_number(e.target.value)}
                  />
                  {errors.NIC_number && <span className="text-red-500">{errors.NIC_number}</span>}
                </div>
                <div className="flex flex-row justify-center font-serif text-center">
                  <button type="submit" className="rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950
    w-[150px] h-8 text-center
    text-white m-[30px]">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
