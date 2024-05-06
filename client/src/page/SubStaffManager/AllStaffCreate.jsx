import React, { useState, useEffect } from 'react'
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from '../../component/Navbarl'
import { Link } from 'react-router-dom';
import userPic from '../../assets/userSh.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AllStaffCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [exprience, setExprience] = useState("");
  const [batch, setBatch] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();

    
    
  //data send method
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/server/StaffInfo/detailsStaffInfo",
        {
          name,
          email,
          gender,
          exprience,
          batch,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        navigate("/AllStaffGet");
        alert("Staff Details created successfully!");
        
       
      } else {
        throw new Error(response.data || "Failed to create UserDetails");
      }
    } catch (error) {
      console.error("Error creating UserDetails:", error);
    }
  };  

  return (
    <div>
    <Navbar/>
  
    <div className='flex'>
      <div className='flex w-[300px] h-[1200px] bg-lime-900'>
        <div className='p-5'>
        <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/StaffManagerAccountShowDetails">StaffManagerAccount</Link></button>
            <button className='w-[230px] h-[40px]  bg-gray-200 rounded-2xl text-center my-3'><Link to="/PaymentInforStaffMan">Payment Infor</Link></button>
            <button className='w-[230px] h-[40px]  bg-gray-200  rounded-2xl text-center my-3'><Link to="/Responce">Responce</Link></button>
            <button className='w-[230px] h-[40px]  bg-gray-500 text-white  rounded-2xl text-center my-3'><Link to="/AllStaffGet">Staff Infor</Link></button>

        </div>
      </div>
        
         
    <div className=" w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32">
    <form className="px-6 py-8" onSubmit={handleSubmit}>
        <input
          className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          required
        />

        <input
          className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email-address"
          required
        />

        <input
          className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
          type="text"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
          required
        />

        <input
          className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
          type="text"
          name="expreience"
          value={exprience}
          onChange={(e) => setExprience(e.target.value)}
          placeholder="Expreience"
          required
        />

        <input
          className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
          type="text"
          name="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Batch"
          required
        />

        <button className="w-[190px] h-[40px] bg-green-900 text-white rounded-xl text-center  mt-6">
          Create
        </button>
      </form>
      </div>
      </div>
    </div>
  )
}

export default AllStaffCreate