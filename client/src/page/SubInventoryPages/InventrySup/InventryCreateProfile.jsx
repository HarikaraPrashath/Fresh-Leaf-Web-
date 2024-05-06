import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../component/Navbar'
import Footer from '../../../component/Footer'


export default function InventryCreateProfile() {
    const { id } = useParams();
    const [mcode, setMcode] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [place, setPlace] = useState("");
    const [mobile, setMobile] = useState("");
    const [UserProfile, setUserProfile] = useState([]);

    useEffect(() => {
        axios
          .get(`http://localhost:3001/server/inventoryProfile/inventoryProfileGetOne/${id}`)
          .then((result) => {
            console.log("data Calling",result);
    
            setMcode(result.data.data.mcode);
            setName(result.data.data.name);
            setEmail(result.data.data.email);
            setPlace(result.data.data.place);
            setMobile(result.data.data.mobile)
          })
          .catch((err) => console.log(err));
      }, [id]);
    
      const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:3001/server/inventoryProfile/inventoryProfileUpdate/${id}`, {
            mcode,
            name,
            email,
            place,
            mobile, 
          })
          .then((result) => {
            console.log(result);
            alert("Profile details successfully updated");
            navigator("/inventryProfile")
          })
          .catch((error) => {
            console.error('Profile not updated:', error);
          });
      };

  return (
    <>
    <Navbar/>
    <div className=' flex flex-row ' >
   
        <div className='w-[20%] h-[700px] flex-grow border bg-lime-50 rounded-br-2xl rounded-tl-2xl '>
          <div className="w-[1165px] h-[136px] flex flex-row items-start justify-end py-0 px-5 box-border max-w-full">
            
          </div>
          <div className=" w-1/2 bg-white bg rounded p-3 ml-[300px] backdrop-grayscale-0 bg-white/30">
                <form onSubmit={handleUpdate} >
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
               
        </div>
    </div>
    </div>
    <br/>
    <div>
    <Footer/>
    </div>

</>
  );
}
