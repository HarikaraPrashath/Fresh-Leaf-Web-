import React, { useState, useEffect } from 'react'
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from '../../component/Navbar'
import { Link } from 'react-router-dom';
import userPic from '../../assets/userSh.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentAddMarketing() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnumber, setCnumber] = useState("");
  const [dateyear, setDateyear] = useState("");
  const [branch, setBranch] = useState("");
  const [cvc, setCvc] = useState([]);
  const [UserProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();


  
//read on page method
useEffect(() => {
    axios
      .get("http://localhost:3001/server/MarketingPayment/Marketingpaymentgetall")
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
    axios.delete(`http://localhost:3001/server/MarketingPayment/Marketingpaymentdelete/${id}`)
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
        "http://localhost:3001/server/MarketingPayment/Marketingpaymentcreate",
        {
          name,
          email,
          cnumber,
          dateyear,
          cvc,
          branch
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
    <div className="flex w-[300px] h-[1200px] bg-lime-900">
            <div className="p-5">
              <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
                <Link to="/MarketingProfile">Profile</Link>
              </button>
              <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                <Link to="/MarketingPage">Activity</Link>
              </button>
              <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                <Link to="/paymentAddMarketing">Payment</Link>
              </button>
            </div>
          </div>

      <div>
        <h1 className='text-center text-3xl'>Payment</h1>
        <div className='w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]'>
            <img src={userPic} alt="user image" className='w-[100px] h-[100px] m-auto ' />
          </div>


        <div className=' w-[700px] h-[800px] bg-gray-300 rounded-lg ml-52 mt-32'>
          <form className='px-6 py-8' onSubmit={handleSubmit} >
             <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Cash holder"
              name='cashHolder'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />

              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />


              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Card Number"
              value={cnumber}
              onChange={(e) => setCnumber(e.target.value)}
              required
              />


              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Date and year"
              value={dateyear}
              onChange={(e) => setDateyear(e.target.value)}
              required
              />


              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
              />

              <input
              className='w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4' 
              type="text" 
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              />


              <button className='w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6'>Create</button>
          </form>
          </div>

          <div className="w-3/4 bg-white rounded p-4">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Card Num</th>
                    <th>Date </th>
                    <th>Cvc</th>
                    <th>Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {/* get all data from db */}
                  {UserProfile.map((profile, index) => (
                    <tr key={index}>
                      <td>{profile.name}</td>
                      <td>{profile.email}</td>
                      <td>{profile.cnumber}</td>
                      <td>{profile.dateyear}</td>
                      <td>{profile.cvc}</td>
                      <td>{profile.branch}</td>
                      <td className="border p-2 flex items-center  justify-around">
                        <Link to={`/staffpaymentupdate/${profile._id}`} className="px-2 py-1 bg-yellow-700 rounded-sm text-white mx-2 "><RxUpdate/></Link>
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

export default PaymentAddMarketing