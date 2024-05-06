import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbarl';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AllStaffUpdatePage() {
  const { id } = useParams(); // Get the staff ID from the URL
  const navigate = useNavigate(); // For navigation after update

  // States for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [batch, setBatch] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/server/StaffInfo/detailsStaffInfoGetOne/${id}`)
      .then((result) => {
        const staff = result.data.data;
        setName(staff.name);
        setEmail(staff.email);
        setGender(staff.gender);
        setExperience(staff.experience);
        setBatch(staff.batch);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Validation function to check errors
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

    if (!gender) {
      newErrors.gender = 'Gender is required.';
    }

    if (!experience) {
      newErrors.experience = 'Experience is required.';
    }

    if (!batch) {
      newErrors.batch = 'Batch is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return; // If validation fails, do not submit
    }

    axios
      .put(`http://localhost:3001/server/StaffInfo/detailsStaffInfoupdate/${id}`, {
        name,
        email,
        gender,
        experience,
        batch,
      })
      .then((result) => {
        alert('Staff member updated successfully!');
        navigate('/AllStaffGet'); // Redirect after successful update
      })
      .catch((error) => {
        console.error('Error updating staff member:', error);
        alert('Failed to update staff member.');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex w-[300px] h-[1200px] bg-lime-900">
          <div className="p-5">
            <button
              className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"
            >
              <Link to="/StaffManagerAccountShowDetails">Staff Manager Account</Link>
            </button>
            <button
              className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"
            >
              <Link to="/PaymentInforStaffMan">Payment Info</Link>
            </button>
            <button
              className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"
            >
              <Link to="/Response">Response</Link>
            </button>
            <button
              className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3"
            >
              <Link to="/AllStaffGet">Staff Info</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center text-3xl">Update Staff Details</h1>
          <div className="w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32">
            <form className="px-6 py-8" onSubmit={handleUpdate}>
              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.name ? 'border-red-500' : ''}`}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
              />
              {errors.name && <span className="text-red-600">{errors.name}</span>}

              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.email ? 'border-red-500' : ''}`}
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />
              {errors.email && <span className="text-red-600">{errors.email}</span>}

              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.gender ? 'border-red-500' : ''}`}
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
              />
              {errors.gender && <span className="text-red-600">{errors.gender}</span>}

              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.experience ? 'border-red-500' : ''}`}
                type="text"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience"
              />
              {errors.experience && <span className="text-red-600">{errors.experience}</span>}

              <input
                className={`w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4 ${errors.batch ? 'border-red-500' : ''}`}
                type="text"
                name="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Batch"
              />
              {errors.batch && <span className="text-red-600">{errors.batch}</span>}

              <button className="w-[190px] h-[40px] bg-green-900 text-white rounded-xl text-center mt-6">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStaffUpdatePage;
