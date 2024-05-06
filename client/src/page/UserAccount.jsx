import React, { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../component/Navbarl";
import { Link } from "react-router-dom";
import userPic from "../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

//variable
function UserAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [posterCode, setPosterCode] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  
  const [filteredProfile, setFilteredProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/server/userInfo/userInfoGet")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors
  }, []);

 
  

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["User name", "Email", "Mobile NO", "City", "Poster Code"];
    const tableRows = [[name, email, mobile, city, posterCode]]; // Use current user information
  
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("User_Information_data.pdf");
  };
  

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/server/userInfo/userInfoDelete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/server/userInfo/userInfoCreation",
        {
          name,
          email,
          mobile,
          city,
          posterCode,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("User Details created successfully!");
        navigate('/OwnerPage');
      } else {
        throw new Error(response.data || "Failed to create UserDetails");
      }
    } catch (error) {
      console.error("Error creating UserDetails:", error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex w-[300px] h-[1200px] bg-lime-900">
          <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/">User Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/userPayment">Payment Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/UserProduct">Delivery Info</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/userFeedback">FeedBack</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/userFeedback">Promotion</Link>
            </button>
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
          <div className=" w-[700px] h-[750px] bg-gray-300 rounded-lg ml-52 mt-[170px]">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-green-900  text-sm font-bold mb-2 ml-8" htmlFor="username">
                  User Name
                </label>
                <input
  id="username"
  className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
  type="text"
  placeholder="UserName"
  value={name}
  autoComplete="off"
  onChange={(e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

    if (regex.test(value) || value === "") {
      // Allow only if it matches the regex or if the value is empty (allowing backspace/delete)
      setName(value);
    }
  }}
  required
/>

              </div>
              <div className="mb-4">
                <label className="block text-green-900 text-sm font-bold mb-2 ml-8" htmlFor="Email">
                  Email-Address
                </label>
                <input
                  className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                  type="email"
                  placeholder="Email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-green-900 text-sm font-bold mb-2 ml-8" htmlFor="MobileNumber">
                  Mobile Number
                </label>
                <input
                  className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                  type="num,ber"
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-green-900  text-sm font-bold mb-2 ml-8" htmlFor="city">
                  City
                </label>
                <input
                  className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
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
                  className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                  type="text"
                  placeholder="Poster Code"
                  value={posterCode}
                  onChange={(e) => setPosterCode(e.target.value)}
                  required
                />
              </div>
              <button className="w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6">
                  Submit
              </button>
             
            </form>

            

           
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAccount