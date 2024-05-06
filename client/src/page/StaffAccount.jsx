import React, { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../component/Navbarl";
import { Link } from "react-router-dom";
import userPic from "../assets/userSh.png";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function StaffAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [exprience, setExprience] = useState("");
  const [batch, setBatch] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // State to track validation errors

  useEffect(() => {
    axios
      .get("http://localhost:3001/server/details/detailsget")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors

      console.log(UserProfile,"cdcdcdcd")
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Exit early if validation fails
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3001/server/details/details",
        {
          name,
          email,
          gender,
          exprience,
          batch,
        }
      );
  
      if (response.status === 200) {
        alert("User details created successfully!");
        navigate("/PaymentInforStaff");
      } else {
        throw new Error("Failed to create user details.");
      }
    } catch (error) {
      console.error("Error creating user details:", error);
      alert("Data enter successfully");
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else {
      // Simple email pattern validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    if (!gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!exprience) {
      newErrors.exprience = "Experience is required.";
    }

    if (!batch) {
      newErrors.batch = "Batch is required.";
    }

    setErrors(newErrors); // Set errors to state
    return Object.keys(newErrors).length === 0; // Returns true if no errors
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
              <Link to="/PaymentInforStaff">Payment Info</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/request">Request</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl ml-[490px]">Staff Account</h1>
          <div className="w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]">
            <img src={userPic} alt="user image" className="w-[100px] h-[100px] m-auto" />
          </div>
          <div className="w-[700px]  h-[800px] bg-gray-300 rounded-lg ml-60 mt-48">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
              <label className="font-bold ml-5 text-xl">Name</label>
              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors({ ...errors, name: '' }); // Clear error if fixed
                  }
                }}
                placeholder="Username"
              />
              {errors.name && <p className="text-red-600 ml-[400px]">{errors.name}</p>} 

              <label className="font-bold ml-5 text-xl">Email-address</label>
              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: '' }); // Clear error if fixed
                  }
                }}
                placeholder="Email-address"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>} 

              <label className="font-bold ml-5 text-xl">Gender</label>
              <select
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                name="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                  if (errors.gender) {
                    setErrors({ ...errors, gender: '' }); // Clear error if fixed
                  }
                }}
                value={gender}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="others">others</option>
              </select>
              {errors.gender && <p className="text-red-600 ml-[400px]">{errors.gender}</p>}

              <label className="font-bold ml-5 text-xl">Experience</label>
              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="exprience"
                value={exprience}
                onChange={(e) => {
                  setExprience(e.target.value);
                  if (errors.exprience) {
                    setErrors({ ...errors, exprience: '' }); // Clear error if fixed
                  }
                }}
                placeholder="Experience"
              />
              {errors.exprience && <p className="text-red-600 ml-[400px]">{errors.exprience}</p>} 

              <label className="font-bold ml-5 text-xl">Batch</label>
              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="batch"
                value={batch}
                onChange={(e) => {
                  setBatch(e.target.value);
                  if (errors.batch) {
                    setErrors({ ...errors, batch: '' }); // Clear error if fixed
                  }
                }}
                placeholder="Batch"
              />
              {errors.batch && <p className="text-red-600 ml-[400px]">{errors.batch}</p>} 

              <button className="w-[650px] h-[40px] bg-green-900 text-white rounded-xl text-center mt-6">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffAccount;
