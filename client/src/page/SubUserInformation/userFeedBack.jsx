import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from '../../component/Navbarl';
import Footer from '../../component/Footer';

function userFeedBack() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    axios
      .get("http://localhost:3001/server/FeedBackUser/getall")
      .then((result) => {
        console.log("data: ", typeof result.data.data);
        console.log("data: ", Object.values(result.data.data));
        setUsers(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/server/FeedBackUser/delete/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
      
  };

  //search part
  const filtreduserFeedback = users .filter((USERfeed) =>
  USERfeed .name.toLowerCase() .includes(searchTerm.toLowerCase())
)


  return (
    <div className='userTable'>
      <Navbar/>

      <div className='w-[00px] ml-[600px]'>
  <label className="relative"> {/* Ensures the label is positioned relative for absolute positioning of the icon */}
    <span className='sr-only'>Search</span>
    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
      <svg className='fill-slate-300 w-5 h-5' viewBox='0 0 20 20'></svg>
    </span>
    <input
      placeholder='Search here...(product name)'
      type='text'
      name='search'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className='w-[500px] px-3 py-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
  </label>
</div>

      <Link to={"/UserFeedbackAdd"} className='addButton bg-green-700 px-4 py-2 rounded-2xl text-white ml-96'>Add Review</Link>

      
      <div className='flex'>
        <div className='flex w-[300px] h-[1200px] bg-lime-900'>
          <div className='p-5'>
            <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'><Link to="/userAccount">User Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userPayment">Payment Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserProduct">Delivery Info</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userFeedback">FeedBack</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserPromotion">Promotion</Link></button>
          </div>
        </div>

        <div>

          {
            filtreduserFeedback.map((user, index) => (
              <div key={user._id} className='flex bg-gray-200 rounded-3xl ml-24 mt-6 w-[1000px] h-[220px]'>
                <div className='flex-2 px-2 py-4'>
                  <h1 className='font-bold mr-96 text-pretty text-2xl ml-3'>{user.name}</h1>
                  <p className='mr-120 text-2xl text-center mt-5'>Rating : {user.rating} out of 5</p>
                  <p className='text-center p-2 '>{user.des}</p>
                  <div className='flex justify-center mt-2 ml-96'>
                    <button onClick={() => handleDelete(user._id)} className='bg-red-500 text-white rounded-2xl px-4 py-1 mr-2'>Delete</button>
                    <Link to={`/UserFeedBackUpdate/${user._id}`} className='bg-yellow-500 text-white rounded-2xl px-4 py-1 mr-2'>Update</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default userFeedBack