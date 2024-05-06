import React, { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../../component/Navbar";
import { Link } from "react-router-dom";
import userPic from "../../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from '../../component/Footer';


export default function InventryProfile() {
    const [mcode, setMcode] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [place, setPlace] = useState("");
    const [mobile, setMobile] = useState("");
    const [UserProfile, setUserProfile] = useState([]);

 useEffect(() => {
    axios
      .get("http://localhost:3001/server/inventoryProfile/inventoryProfileGetAll")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors

      console.log(UserProfile,"cdcdcdcd")
  }, []);

  const handleDelete = (id)=>
  {
    axios.delete(`http://localhost:3001/server/inventoryProfile/inventoryProfileDelete/${id}`)
    .then(res=>{console.log(res)
        window.location.reload()
    } )
    .catch(err=>console.log(err))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/server/inventoryProfile/inventoryProfileCreate",
        {
          mcode,
          name,
          email,
          place,
          mobile
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("User Details created successfully!");
        navigate("/");
      
      } else {
        throw new Error(response.data || "Failed to create UserDetails");
      }
    } catch (error) {
      console.error("Error creating UserDetails:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className=' flex flex-row ' >
    <div className="flex w-[300px] h-[1200px] bg-lime-900">
          <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/inventryProfile">Profile</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventroyAddtoForms">Add Form</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventryAnalytics">Analytics</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventryCalculation">Caluculate</Link>
            </button>
            
          </div>
        </div>
        <div className='w-[20%] h-[700px] flex-grow border bg-lime-50 rounded-br-2xl rounded-tl-2xl '>
          <div className="w-[1165px] h-[136px] flex flex-row items-start justify-end py-0 px-5 box-border max-w-full">
            
          </div>
          <div className=" w-1/2 bg-white bg rounded p-3 ml-[300px] backdrop-grayscale-0 bg-white/30">
                <form onSubmit={handleSubmit} >
                    <h2 className="text-2xl font-bold mb-4 font-serif">Add Profile</h2>
                    <div className="mb-2 font-serif">
                        <label htmlFor="">ID</label>
                        <input
                            type="text"
                            placeholder="Menan001"
                            className="w-full p-2 border rounded"
                            value={mcode}
                            onChange={(e) => setMcode(e.target.value)}
                            />
                    </div>
                    <div className="mb-2 font-serif">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Menan"
                            className="w-full p-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}


                            />
                    </div>
                    <div className="mb-2 font-serif">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="menan@gmail.com"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            

                        />
                    </div>
                    <div className="mb-2 font-serif">
                        <label htmlFor="">Place</label>
                        <input
                            type="text"
                            placeholder="Batticaloa"
                            className="w-full p-2 border rounded"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}

                            
                        />
                    </div>
                    <div className="mb-2 font-serif">
                        <label htmlFor="">Phone.No</label>
                        <input
                            type="text"
                            placeholder="+94 77613765"
                            className="w-full p-2 border rounded"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}

                            
                        />
                    </div>
                    <div className='flex flex-row p-3 justify-between font-serif'>
                    <button className='bg-green-800 text-white px-5 py-1 rounded-xl ml-[480px]'>Submit</button>
                </div>
                </form>
                <div className="w-3/4 bg-white rounded p-4">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Mcode</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Place</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {/* get all data from db */}
                  {UserProfile.map((profile, index) => (
                    <tr key={index}>
                      <td>{profile.cname}</td>
                      <td>{profile.name}</td>
                      <td>{profile.email}</td>
                      <td>{profile.place}</td>
                      <td>{profile.mobile}</td>
                      <td className="border p-2 flex items-center  justify-around">
                        <Link to={`/inventryCreateProfile/${profile._id}`} className="px-2 py-1 bg-yellow-700 rounded-sm text-white mx-2 "><RxUpdate/></Link>
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
    <br/>
    <div>
    <Footer/>
    </div>

</>  )
}
