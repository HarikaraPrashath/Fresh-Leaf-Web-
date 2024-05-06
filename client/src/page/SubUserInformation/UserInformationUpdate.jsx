import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import { Link, useParams } from "react-router-dom";
import userPic from "../../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function UserInformationUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [posterCode, setPosterCode] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();


 
     
  useEffect(() => {
    axios
      .get(`http://localhost:3001/server/userInfo/userInfoGetOne/${id}`)
      .then((result) => {
        console.log("vfdfdfdf",result);
        setName(result.data.data.name);
        setEmail(result.data.data.email);
        setMobile(result.data.data.mobile);
        setCity(result.data.data.city);
        setPosterCode(result.data.data.posterCode);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/server/userInfo/userInfoUpdate/${id}`, {
        name,
        email,
        mobile,
        city,
        posterCode,
      })
      .then((result) => {
        console.log(result);
        alert("User Infomation update successfully!");
        navigate("/OwnerPage");
      });
  };

  return (
    <div>
    <Navbar/>
    <div className='flex'>
      <div className='flex w-[300px] h-[1200px] bg-lime-900'>
      <div className='p-5'>
            <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'><Link to="/userAccount">User Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userPayment">Payment Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserProduct">Delivery Info</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userFeedback">FeedBack</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserPromotion">Promotion</Link></button>
          </div>
      </div>
      <div>
      <h1 className="text-3xl ml-[430px] text-green-600 ">
            User Information
          </h1>
          <div className="w-[150px] h-[150px]  rounded-full  mt-8 bg-gray-300 pt-5 -mb-[150px] ml-[450px]">
            <img
              src={userPic}
              alt="user image"
              className="w-[100px] h-[100px] ml-[25px] "
            />
          </div>
        <div className=' w-[700px] h-[750px] bg-gray-300 rounded-lg ml-52 mt-32'>
          <form className='px-6 py-8' onSubmit={handleUpdate}>
          <div className="mb-4">
          <label className="block text-green-900  text-sm font-bold mb-2 ml-8" htmlFor="username">
                  User Name
                </label>
             <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
              </div>
              <div className="mb-4">
              <label className="block text-green-900 text-sm font-bold mb-2 ml-8" htmlFor="Email">
                  Email-Address
                </label>
              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
</div>
              <div className="mb-4">
              <label className="block text-green-900 text-sm font-bold mb-2 ml-8" htmlFor="MobileNumber">
                  Mobile Number
                </label>
              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              />
</div>
<div className="mb-4">
                <label className="block text-green-900 text-sm font-bold mb-2 ml-8" htmlFor="Email">
                  city
                </label>
              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              />
             </div>

             <div className="mb-4">
             <label className="block text-green-900 text-sm font-bold mb-2 ml-8" htmlFor="city">
                  Poster Code
                </label>
              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Poster Code"
              value={posterCode}
              onChange={(e) => setPosterCode(e.target.value)}
              required
              />
</div>

              <button className='w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6'>
           
                Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserInformationUpdate