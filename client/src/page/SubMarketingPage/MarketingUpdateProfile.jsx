import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import { Link, useParams } from "react-router-dom";
import userPic from "../../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MarketingUpdateProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [exprience, setExprience] = useState("");
    const [batch, setBatch] = useState("");
    const [UserProfile, setUserProfile] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        axios
          .get(`http://localhost:3001/server/MarketingProfile/MarketingProfileGetOne/${id}`)
          .then((result) => {
            console.log("vfdfdfdf",result);
            setName(result.data.data.name);
            setEmail(result.data.data.email);
            setGender(result.data.data.gender);
            setExprience(result.data.data.exprience);
            setBatch(result.data.data.batch);
          })
          .catch((err) => console.log(err));
      }, [id]);
    

      const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:3001/server/MarketingProfile/MarketingProfileUpdate/${id}`, {
            name,
            email,
            gender,
            exprience,
            batch,
          })
          .then((result) => {
            console.log(result);
            alert("Product update successfully!");
            navigate("/home");
          });
      };
    
  return (
    <div>
    <Navbar />
    <div className="flex">
      <div className="flex w-[300px] h-[1200px] bg-lime-900">
        <div className="p-5">
          <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
            <Link to="/staffAccount">Details</Link>
          </button>
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
            <Link to="/PaymentInforStaff">Payment Infor</Link>
          </button>
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
            <Link to="/request">Request</Link>
          </button>
        </div>
      </div>
      <div>
        <h1 className="text-3xl text-center">Staff Account</h1>
        <div className="w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]">
          <img
            src={userPic}
            alt="user image"
            className="w-[100px] h-[100px] m-auto "
          />
        </div>
        <div className=" w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32">
          <form className="px-6 py-8" onSubmit={handleUpdate}>
            <input
              className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />

            <input
              className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email-address"
            />

            <input
              className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Gender"
            />

            <input
              className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
              type="text"
              name="expreience"
              value={exprience}
              onChange={(e) => setExprience(e.target.value)}
              placeholder="Expreience"
            />

            <input
              className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
              type="text"
              name="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Batch"
            />

            <button className="w-[190px] h-[40px] bg-green-900 text-white rounded-xl text-center  mt-6">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MarketingUpdateProfile