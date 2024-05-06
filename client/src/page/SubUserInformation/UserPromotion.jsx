import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from '../../component/Footer';
import Navbar from '../../component/Navbarl';
import { Link } from 'react-router-dom';
// Import the tea image
import tea from '../../assets/tea.jpg';  // Adjust the path as per your project structure

function UserPromotion() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/server/MarketingActivity/getAllDetails")
            .then((result) => {
                console.log("data: ", typeof result.data.data); // Check the fetched data
                console.log("data: ", Object.values(result.data.data)); // Check the fetched data
                setUsers(result.data ? Object.values(result.data.data) : []);
            })
            .catch((err) => console.error(err)); // Log any errors
    }, []);

    const deleteReview = async (userId) => {
        await axios.delete(`http://localhost:3001/server/MarketingActivity/deleteDetailsById/${userId}`)
            .then((response) => {
                console.log("AdDelete", response.data);
                // After deleting, you might want to update the state to remove the deleted item from the UI
                setUsers(users.filter(user => user._id !== userId));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
         <div>
            <Navbar />
            <div className='flex'>
            <div className='flex flex-row'>
            <div className='flex w-[300px] h-[1200px] bg-lime-900'>
        <div className='p-5'>
            <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'><Link to="/userAccount">User Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userPayment">Payment Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserProduct">Delivery Info</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/userFeedback">FeedBack</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/UserPromotion">Promotion</Link></button>
          </div>
      </div>
            </div>

            {/* {users.map((user, index) => (
                <div key={user._id} className='flex bg-gray-200 rounded-3xl w-[850px] h-[250px]'>
                    <img src={tea} alt="tea" className='w-50 h-50 p-1 rounded-[30px]' />
                    <div className='flex-1 flex  justify-between px-2 py-4'>
                        <div>
                            <h1 className='font-bold text-pretty text-2xl'>{user.name}</h1>
                            <p className='text-xl text-center mt-5'>{user.des}</p>
                            <p className='text-center font-bold p-2 text-4xl'>{user.duration}</p>
                        </div>
                        <div className='flex justify- w-15'>
                            <button onClick={() => deleteReview(user._id)} className='bg-red-500 text-white rounded-2xl px-4 py-1 mr-2'>Delete</button>
                        </div>
                    </div>
                </div>
            ))} */}
           {users.map((user, index) => (
    <div key={user._id} className='flex bg-gray-200 rounded-3xl ml-10 w-[450px] p-2 h-[200px]'>
      <div className='flex-1 flex flex-col justify-between px-2 py-6'>
        <div>
          <h1 className='font-bold text-pretty text-3xl'>{user.name}</h1>
          <p className='text-xl text-center mt-5'>{user.des}</p>
          <p className='text-center  p-2 text-xl'>{user.duration}</p>
          <p className='text-center  p-2 text-xl'>{user.duratione}</p>
        </div>
       
      </div>
    </div>
  ))}

</div>
            <Footer />
        </div>
    );
}

export default UserPromotion;
