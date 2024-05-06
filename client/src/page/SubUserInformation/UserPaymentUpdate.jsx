import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import { Link, useParams } from "react-router-dom";
import userPic from "../../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import payments from "../../assets/payments.svg";

function UserProductUpdate() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cnumber, setCnumber] = useState([]);
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();
  const{id} = useParams();
  


  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/server/userInfoPayment/userInfoPaymentGetOne/${id}`)
      .then((result) => {
        console.log("vfdfdfdf",result);
        setFname(result.data.data.fname);
        setLname(result.data.data.lname);
        setCity(result.data.data.city);
        setAddress(result.data.data.address);
        setPostalCode(result.data.data.postalCode);
        setCnumber(result.data.data.cnumber);
      })


      .catch((err) => console.log(err));
  }, [id]);

           

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/server/userInfoPayment/userInfoPaymentUpdate/${id}`, {
        fname, 
        lname, 
        city, 
        address ,
        postalCode,
        cnumber
      })
      .then((result) => {
        console.log(result);
        alert("Product update successfully!");
        navigate("");
      });
  };

  return (
    <div>
    <Navbar/>
    <div className='flex'>
      <div className='flex w-[300px] h-[1200px] bg-lime-900'>
        <div className='p-5'>
          <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'><Link to="/">User Infor</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="">Payment Infor</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="">Delivery Info</Link></button>
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/">FeedBack</Link></button>

        </div>
      </div>
      <div>
        <h1 className='text-3xl text-center'>Payment Information</h1>
        <div className='w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]'>
          <img src={userPic} alt="user image" className='w-[100px] h-[100px] m-auto ' />
        </div>
        <div className=' w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32'>
          <form className='px-6 py-8' onSubmit={handleUpdate}>
          <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Name"
      type="text"
      placeholder="First Name"
      value={fname}
      onChange={(e) => setFname(e.target.value)}
       />
    </div>
    <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Name"
      type="text"
      placeholder="last Name"
      value={lname}
      onChange={(e) => setLname(e.target.value)}
    />
    </div>
    <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="City"
      type="text"
      placeholder="City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    </div>
     <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Address"
      type="text"
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Code"
      type="text"
      placeholder='Postal code (ZIP)'
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}
    />
  </div>
  <div className="mb-4">
  <img  className='w-[3000px] h-[34px] ' src={payments} alt='Logo'/>
    </div>

  <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Date"
      type="text"
      placeholder=" Card Number                           MM/YY CVC"
      value={cnumber}
      onChange={(e) => setCnumber(e.target.value)}
    />
  </div>


              <button className='w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6'>Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserProductUpdate