import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Loginpic from '../assets/loginPic.svg';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({}); // Define errors state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    
    const newErrors = { ...errors };
    if (value.trim() === "") {
      newErrors[id] = "This field is required";
    } else {
      delete newErrors[id];
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/server/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        console.error(data.error);
        return; // Handle the error appropriately (e.g., display an error message)
      }

      // Redirect based on the user's role
      if (data.role === 'user') {
        navigate('/userAccount');
      } 
      else if (data.role === 'supplier') {
        navigate('/supplierAccount');
      } 
      else if (data.role === 'Staff') {
        navigate('/staffAccount');
      } 
      else if (data.role === 'StManager') {
        navigate('/staffManagerAccount');
      } 
      else if (data.role === 'Shipment') {
        navigate('/shipmentAccount');
      }
      else if (data.role === 'marketingM') {
        navigate('/MarketingPage');
      }
      else if (data.role === 'Owner') {
        navigate('/OwnerPage');
      }
      else {
        // Handle unknown role
        console.error('Unknown role:', data.role);
      }
    } catch (error) {
      console.error(error.message);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-[1000px] h-[600px] bg-gray-100 m-auto rounded-3xl p-8 my-7">
        <div className="p-5 flex-1">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-10 text-center">LogIn To Your Account</h2>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter the e-mail"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                id="email"
                name='email'
              />
               {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter the password"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                id="password"
                name="password"
              />
               {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="flex justify-between">
              <div className="text-green-600 -mt-1">Forget Password</div>
            </div>

            <button className="bg-green-500 w-full text-white px-4 py-2 rounded mt-6  hover:bg-green-900">
              Log in
            </button>
          </form>
          <h1 className="text-center mt-10">
            {' '}
            Not Register Yet? <Link to="/register" className=" text-green-600 hover:opacity-95 cursor-pointer">Register</Link>
          </h1>
          <h1></h1>
        </div>
        <div><img className="w-96 h-96" src={Loginpic} alt="" /></div>
      </div>
    </div>
  );
}

export default Login;
