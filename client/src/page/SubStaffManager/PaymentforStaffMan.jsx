import React, { useState, useEffect } from 'react';
import { RxUpdate } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Navbar from '../../component/Navbarl';
import { Link, useNavigate } from 'react-router-dom';
import userPic from '../../assets/userSh.png';
import axios from 'axios';

function PaymentforStaffMan() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnumber, setCnumber] = useState('');
  const [dateyear, setDateyear] = useState('');
  const [branch, setBranch] = useState('');
  const [cvc, setCvc] = useState('');
  const [UserProfile, setUserProfile] = useState([]);
  const [errors, setErrors] = useState({}); // Define state to hold errors
  const navigate = useNavigate();

  // Data fetch logic
  useEffect(() => {
    axios
      .get('http://localhost:3001/server/StaffManagerPaymentRoute/staffManagerPaymentGetAll')
      .then((result) => {
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Delete logic
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/server/StaffManagerPaymentRoute/staffManagerPaymentDelete/${id}`)
      .then(() => {
        setUserProfile((prev) => prev.filter((profile) => profile._id !== id)); // Update state to remove deleted item
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to delete user details.');
      });
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        newErrors.email = 'Invalid email format.';
      }
    }

    if (!cnumber) {
      newErrors.cnumber = 'Card number is required.';
    } else if (cnumber.length !== 16) {
      newErrors.cnumber = 'Card number must be 16 digits.';
    }

    if (!dateyear) {
      newErrors.dateyear = 'Date and year are required.';
    }

    if (!cvc) {
      newErrors.cvc = 'CVC is required.';
    } else if (cvc.length !== 3) {
      newErrors.cvc = 'CVC must be 3 digits.';
    }

    if (!branch) {
      newErrors.branch = 'Branch is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Submission logic with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent submission if there are validation errors
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/server/StaffManagerPaymentRoute/staffManagerPaymentDetails',
        {
          name,
          email,
          cnumber,
          dateyear,
          cvc,
          branch,
        }
      );

      if (response.status === 200) {
        alert('User Details created successfully!');
        navigate('/'); // Redirect or refresh as needed
      } else {
        throw new Error('Failed to create user details');
      }
    } catch (error) {
      console.error('Error creating user details:', error);
      alert('successfully Create Your Data');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex w-[300px] h-[1500px] bg-lime-900">
          <div className="p-5">
            <button
              className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"
            >
              <Link to="/StaffManagerAccountShowDetails">StaffManagerAccount</Link>
            </button>
            <button
              className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3"
            >
              <Link to="/PaymentInforStaffMan">Payment Infor</Link>
            </button>
            <button
              className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"
            >
              <Link to="/Responce">Responce</Link>
            </button>
            <button
              className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"
            >
              <Link to="/AllStaffGet">Staff Infor</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className=" ml-[520px] text-3xl">Payment</h1>
          <div className="w-[150px] h-[150px] rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[90px]">
            <img src={userPic} alt="user image" className="w-[100px] h-[100px] m-auto " />
          </div>
          <div className="w-[700px] h-[950px] bg-gray-300 rounded-lg ml-56 mt-32">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
            <label className="font-bold ml-5 text-xl">Cash holer</label>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.name ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Cash holder"
                value={name}
                onChange={(e) => setName(e.target.value)}
              /><br/>
              {errors.name && <span className="text-red-600 ml-[400px]">{errors.name}</span>}
              <br/>
              <label className="font-bold ml-5 text-xl">Email-address</label>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.email ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br/>
              {errors.email && <span className="text-red-600 ml-[400px]">{errors.email}</span>}
              <br/>
              <label className="font-bold ml-5 text-xl">Card Number</label>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.cnumber ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Card Number"
                value={cnumber}
                onChange={(e) => setCnumber(e.target.value)}
              /><br/>
              {errors.cnumber && <span className="text-red-600 ml-[400px]">{errors.cnumber}</span>}
              <br/>
              <label className="font-bold ml-5 text-xl">Date year</label>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.dateyear ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Date and Year"
                value={dateyear}
                onChange={(e) => setDateyear(e.target.value)}
              /><br/>
              {errors.dateyear && <span className="text-red-600 ml-[400px]">{errors.dateyear}</span>}
              <br/>
              <label className="font-bold ml-5 text-xl">CVC</label>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.cvc ? 'border-red-500' : ''}`}
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              /><br/>
              {errors.cvc && <span className="text-red-600 ml-[400px]">{errors.cvc}</span>}
              <br/>
              <label className="font-bold ml-5 text-xl">Branch</label>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.branch ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              /><br/>
              {errors.branch && <span className="text-red-600 ml-[400px]">{errors.branch}</span>}
              <br/>
              <button className="w-[650px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-1 mt-6">
                Create
              </button>
            </form>
          </div>

          <div className="w-3/4 bg-white rounded ml-[250px] p-4">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Card Num</th>
                  <th>Date</th>
                  <th>CVC</th>
                  <th>Branch</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {UserProfile.map((profile, index) => (
                  <tr key={index}>
                    <td>{profile.name}</td>
                    <td>{profile.email}</td>
                    <td>{profile.cnumber}</td>
                    <td>{profile.dateyear}</td>
                    <td>{profile.cvc}</td>
                    <td>{profile.branch}</td>
                    <td className="border p-2 flex items-center justify-around">
                      <Link to={`/StaffManagerPaymentUpdate/${profile._id}`} className="px-2 py-1 bg-yellow-700 rounded-sm text-white mx-2">
                        <RxUpdate />
                      </Link>
                      <button className="px-2 py-1 bg-red-700 rounded-sm text-white mx-2" onClick={() => handleDelete(profile._id)}>
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentforStaffMan;
