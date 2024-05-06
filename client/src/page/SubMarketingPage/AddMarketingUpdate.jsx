import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


function AddMarketingUpdate() {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/server/MarketingActivity/getOneDetails/${id}`)
      .then((result) => {
        console.log("vfdfdfdf",result);
        setName(result.data.data[0].name);
        setDes(result.data.data.des);
        setDuration(result.data.data.duration);
        
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/server/MarketingActivity/updateDetailsById/${id}`, {
        name,
        des,
        duration,
      })
      .then((result) => {
        console.log(result);
        alert("Product update successfully!");
        navigate("/MarketingPage");
      });
  };

    return (
      <div className="mx-auto max-w-lg py-8">
      <Link to={"/"} className="block text-blue-600 hover:underline">Back</Link>
      <h3 className="text-2xl font-semibold mt-4 mb-8">Update Review</h3>
      <form className='addreviewForm' onSubmit={handleUpdate}>
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
    <input type="text" 
      id="descript" 
      name="descript" 
      autoComplete='off' 
      placeholder='Description' 
      className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
      value={des}
      onChange={(e) => setDes(e.target.value)}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="duration" className="block text-gray-700">Duration</label>
    <input type="text" 
      id="duration" 
      name="duration" 
      autoComplete='off' 
      placeholder='Duration' 
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />
  </div>
  <div className="mt-4">
    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">Update</button>
  </div>
      </form>
  </div>
    );
}

export default AddMarketingUpdate;
