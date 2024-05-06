import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function AddMarketing() {

  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [duration, setDuration] = useState("");
  const [duratione, setDuratione] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/server/MarketingActivity/CreateDetails",
        {
          name,
          des,
          duration,
          duratione,
        }
      );

      if (response.status === 201) {
        const data = response.data;
        console.log(data);
        alert("Advertisement created successfully!");
        navigate("/MarketingPage");
      } else {
        throw new Error(response.data || "Failed to create Advertisement");
      }
    } catch (error) {
      console.error("Error creating Advertisement:", error);
      alert('Fill all the spaces!');
    }
  };

  return (
    <div className="mx-auto max-w-lg py-8">
      <Link to={"/MarketingPage"} className="block text-blue-600 hover:underline">Back</Link>
      <h3 className="text-2xl font-semibold mt-4 mb-8">Add new Advertisement</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="adname" className="block text-gray-700">Advertisement name</label>
          <input type="text" 
            id="adname" 
            name="adname" 
            autoComplete='off' 
            placeholder='Advertisement name' 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
  <label htmlFor="descript" className="block text-gray-700">Description</label>
  <input 
    type="text" 
    id="descript" 
    name="descript" 
    autoComplete='off' 
    placeholder='Description' 
    className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
    value={des}
    onChange={(e) => {
      const inputValue = e.target.value;
      // Validation to allow only alphanumeric characters and spaces
      const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
      setDes(sanitizedValue);
    }}
  />
</div>


        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">Start Duration</label>
          <input type="text" 
            id="duration" 
            name="duration" 
            autoComplete='off' 
            placeholder='Start Duration' 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">End Duration</label>
          <input type="text" 
            id="duratione" 
            name="duration" 
            autoComplete='off' 
            placeholder='End Duration' 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={duratione}
            onChange={(e) => setDuratione(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">Add Advertisement</button>
        </div>
      </form>
    </div>
  );
}

export default AddMarketing;
