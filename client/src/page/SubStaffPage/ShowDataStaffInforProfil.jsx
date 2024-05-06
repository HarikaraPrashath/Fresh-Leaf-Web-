import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../../component/Navbarl"; // Import Navbar component
import { Link } from "react-router-dom";
import userPic from "../../assets/userSh.png";
import axios from "axios";

function ShowDataStaffInforProfil() {
  const [UserProfile, setUserProfile] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/server/details/detailsget")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors

    console.log(UserProfile, "cdcdcdcd");
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/server/details/detailsdelete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar /> {/* Assuming Navbar component is defined */}
      <div className="flex">
        <div className="flex w-[300px] h-[1200px] bg-lime-900">
          <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/staffAccount">Details</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/PaymentInforStaff">Payment Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/request">Request</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl ml-[480px]">Staff Account</h1>
          <div className="w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]">
            <img
              src={userPic}
              alt="user image"
              className="w-[100px] h-[100px] m-auto "
            />
          </div>

          <div className="mt-[170px]">
          {UserProfile.map((user, index) => (
            <div
              key={user._id}
              className="flex bg-gray-200 rounded-3xl ml-24 mt-6 w-[1000px] h-[270px]"
            >
              <div className="flex-2 px-2 py-4">
                <div>
                  <p className="font-bold text-xl ml-4 my-2">Name : <span className="font-normal"> {user.name}</span></p>
                  <p className="font-bold text-xl ml-4 my-2">E-mail : <span className="font-normal"> {user.email}</span></p>
                  <p className="font-bold text-xl ml-4 my-2">Gender : <span className="font-normal"> {user.gender}</span></p>
                  <p className="font-bold text-xl ml-4 my-2">Expreience: <span className="font-normal"> {user.exprience}</span></p>
                  <p className="font-bold text-xl ml-4 my-2">Batch: <span className="font-normal"> {user.batch}</span></p>

                </div>
                <div className="flex justify-center mt-5 ml-[800px]">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white rounded-2xl px-4 py-1 mr-2"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/staffupdate/${user._id}`}
                    className="bg-yellow-500 text-white rounded-2xl px-4 py-1 mr-2"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDataStaffInforProfil;
