import React, { useState, useEffect } from 'react'
import Navbar from '../../component/Navbar'
import { Link} from 'react-router-dom';
import userPic from '../../assets/userSh.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import payments from "../../assets/payments.svg";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";

function UserPayment() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cnumber, setCnumber] = useState([]);
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();



  
//read on page method
useEffect(() => {
  axios
    .get("http://localhost:3001/server/userInfoPayment/userInfoPaymentGet")
    .then((result) => {
      console.log("data: ", typeof result.data.data); // Check the fetched data
      console.log("data: ", Object.values(result.data.data)); // Check the fetched data
      setUserProfile(result.data ? Object.values(result.data.data) : []);
    })
    .catch((err) => console.error(err)); // Log any errors

    console.log(UserProfile,"cdcdcdcd")
}, []);


//delete method
const handleDelete = (id)=>
{
  axios.delete(`http://localhost:3001/server/userInfoPayment/userInfoPaymentDelete/${id}`)
  .then(res=>{console.log(res)
      window.location.reload()
  } )
  .catch(err=>console.log(err))
}


//data send method
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3001/server/userInfoPayment/userInfoPaymentCreation",
      {
        fname, 
        lname, 
        city, 
        address ,
        postalCode,
        cnumber
      }
    );

    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      alert("User Details created successfully!");
      navigate("");
      alert("YOU");
    } else {
      throw new Error(response.data || "Failed to create UserDetails");
    }
  } catch (error) {
    console.error("Error creating UserDetails:", error);
  }
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
          <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userFeedback">Promotion</Link></button>
        </div>
      </div>
      <div>
        <h1 className='text-3xl text-center'>Payment Information</h1>
        <div className='w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]'>
          <img src={userPic} alt="user image" className='w-[100px] h-[100px] m-auto ' />
        </div>
        <div className=' w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32'>
          <form className='px-6 py-8' onSubmit={handleSubmit}>
          <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Name"
      type="text"
      placeholder="First Name"
      value={fname}
      onChange={(e) => setFname(e.target.value)}
       />
    </div>
    <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Name"
      type="text"
      placeholder="last Name"
      value={lname}
      onChange={(e) => setLname(e.target.value)}
    />
    </div>
    <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="City"
      type="text"
      placeholder="City"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    </div>
     <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Address"
      type="text"
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>
  <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Code"
      type="text"
      placeholder='Postal code (ZIP)'
      value={postalCode}
      onChange={(e) => setPostalCode(e.target.value)}
    />
  </div>
  <div className="mb-4">
  <img  className='w-[3000px] h-[34px] ' src={payments} alt='Logo'/>
    </div>

  <div className="mb-4">
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="Date"
      type="text"
      placeholder=" Card Number                           MM/YY CVC"
      value={cnumber}
      onChange={(e) => setCnumber(e.target.value)}
    />
  </div>


              <button className='w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6'>Update</button>
          </form>
        </div>
        <div className="w-3/4 bg-white rounded p-4">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th>fname</th>
                    <th>lname</th>
                    <th>City</th>
                    <th>address </th>
                    <th>postalcode</th>
                    <th>c number</th>
                  </tr>
                </thead>
                <tbody>
                  {/* get all data from db */}
                  {UserProfile.map((profile, index) => (
                    <tr key={index}>
                      <td>{profile.fname}</td>
                      <td>{profile.lname}</td>
                      <td>{profile.city}</td>
                      <td>{profile.address}</td>
                      <td>{profile.postalCode}</td>
                      <td>{profile.cnumber}</td>
                      <td className="border p-2 flex items-center  justify-around">
                        <Link to={`/userPaymentUpdate/${profile._id}`} className="px-2 py-1 bg-yellow-700 rounded-sm text-white mx-2 "><RxUpdate/></Link>
                        <button className="px-2 py-1 bg-red-700 rounded-sm text-white mx-2" onClick={(e)=>handleDelete(profile._id)}><RiDeleteBin6Line/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>

      
    
    </div>

    
  </div>
  )
}

export default UserPayment