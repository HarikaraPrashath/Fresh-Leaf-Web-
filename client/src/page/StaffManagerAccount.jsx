import React, { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../component/Navbarl";
import { Link, useNavigate } from "react-router-dom";
import userPic from "../assets/userSh.png";
import axios from "axios";

function StaffManagerAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [exprience, setExprience] = useState("");
  const [branch, setBranch] = useState("");
  const [UserProfile, setUserProfile] = useState([]);
  const [errors, setErrors] = useState({}); // Add an error state
  const navigate = useNavigate();

  // Validation function to check form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required.";
    } else {
      const namePattern = /^[a-zA-Z\s]+$/; 
      if (!namePattern.test(name)) {
        newErrors.name = "Name must contain only letters and spaces.";
      }
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else {
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

    if (!branch) {
      newErrors.branch = "Branch is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Delete handler
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/server/StaffManager/staffManagerDelete/${id}`)
      .then((res) => {
        console.log(res);
        setUserProfile((prev) => prev.filter((profile) => profile._id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Submit handler with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, do not submit
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/server/StaffManager/staffManagerDetails",
        {
          name,
          email,
          gender,
          exprience,
          branch,
        }
      );

      if (response.status === 200) {
        alert("User Details created successfully!");
        navigate("/"); // Navigate as needed
      } else {
        throw new Error("Failed to create User Details");
      }
    } catch (error) {
      console.error("Error creating User Details:", error);
    }
  };

  // Fetch existing staff managers
  useEffect(() => {
    axios
      .get("http://localhost:3001/server/StaffManager/staffManagerGetAll")
      .then((result) => {
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex w-[300px] h-[725px] bg-lime-900">
          <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/StaffManagerAccount">StaffManagerAccount</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/PaymentInforStaffMan">Payment Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/Responce">Responce</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/AllStaffGet">Staff Infor</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl  ml-[420px] mb-6">Staff Account Manager</h1>
        
          <div className="w-[1200px] h-[520px] bg-gray-300 rounded-lg ml-1 ">
            <form className="px-6 py-8" onSubmit={handleSubmit}>

           <div className="flex">
            <div>
           <label className="font-bold ml-5 text-xl">Name</label>
              <input
                className={`w-[500px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.name ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="text-red-600 ml-[400px] ">{errors.name}</span>}
              </div>
              <div>
              <label className="font-bold ml-5 text-xl">Email-address</label>
              <input
                className={`w-[500px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.email ? 'border-red-500' : ''}`}
                type="email"
                placeholder="Email-address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> 
              {errors.email && <span className="text-red-600 ml-[400px]">{errors.email}</span>}
              </div>
           </div>
             <div className="flex">
              <div>
              <label className="font-bold ml-5 text-xl">Gender</label>
              <select
                className="w-[500px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
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
              </select> <br/>
              {errors.gender && <p className="text-red-600 ml-[400px]">{errors.gender}</p>}
              </div>
              <div>
              <label className="font-bold ml-5 text-xl">Experience</label>
              <input
                className={`w-[500px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.exprience ? 'border-red-500' : ''}`}
                type="number"
                placeholder="Experience"
                value={exprience}
                onChange={(e) => setExprience(e.target.value)}
              /> <br/>
              {errors.exprience && <span className="text-red-600 ml-[400px]">{errors.exprience}</span>}
              
              </div>
             </div>
            
              
              <label className="font-bold ml-5 text-xl">Branch</label><br></br>
              <input
                className={`w-[500px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.branch ? 'border-red-500' : ''}`}
                type="number"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
              {errors.branch && <span className="text-red-600 ml-[400px]">{errors.branch}</span>}
<br></br>
              <button className="w-[350px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-[390px] mt-6">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffManagerAccount;
