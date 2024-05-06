import React, { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from "../../component/Navbar";
import { Link } from "react-router-dom";
import userPic from "../../assets/userSh.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function MarktingProfilPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [exprience, setExprience] = useState("");
    const [batch, setBatch] = useState("");
    const [UserProfile, setUserProfile] = useState([]);
    const navigate = useNavigate();
  
    
  useEffect(() => {
    axios
      .get("http://localhost:3001/server/MarketingProfile/MarketingProfileGetAll")
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
    axios.delete(`http://localhost:3001/server/MarketingProfile/MarketingProfileDelete/${id}`)
    .then(res=>{console.log(res)
        window.location.reload()
    } )
    .catch(err=>console.log(err))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/server/MarketingProfile/MarketingProfileCreate",
        {
          name,
          email,
          gender,
          exprience,
          batch,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("User Details created successfully!");
        navigate("/PaymentInforStaff");
      
      } else {
        throw new Error(response.data || "Failed to create UserDetails");
      }
    } catch (error) {
      console.error("Error creating UserDetails:", error);
    }
  };

  return (
    <div>
         <div>
      <Navbar />
      <div className="flex">
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
          <h1 className="text-3xl text-center">Staff Account</h1>
          <div className="w-[150px] h-[150px]  rounded-full ml-[500px] mt-5 bg-gray-300 pt-3 -mb-[150px]">
            <img
              src={userPic}
              alt="user image"
              className="w-[100px] h-[100px] m-auto "
            />
          </div>
          <div className=" w-[700px] h-[600px] bg-gray-300 rounded-lg ml-52 mt-32">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                required
              />

              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email-address"
                required
              />

              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                required
              />

              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="expreience"
                value={exprience}
                onChange={(e) => setExprience(e.target.value)}
                placeholder="Expreience"
                required
              />

              <input
                className="w-[600px] h-[50px] ml-3 rounded-3xl px-5 py-2 my-4"
                type="text"
                name="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Batch"
                required
              />

              <button className="w-[190px] h-[40px] bg-green-900 text-white rounded-xl text-center  mt-6">
                Create
              </button>
            </form>

            <div className="w-3/4 bg-white rounded p-4">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Experienc</th>
                    <th>Batch</th>
                  </tr>
                </thead>
                <tbody>
                  {/* get all data from db */}
                  {UserProfile.map((profile, index) => (
                    <tr key={index}>
                      <td>{profile.name}</td>
                      <td>{profile.email}</td>
                      <td>{profile.gender}</td>
                      <td>{profile.exprience}</td>
                      <td>{profile.batch}</td>
                      <td className="border p-2 flex items-center  justify-around">
                        <Link to={`/MarketingUpdateProfile/${profile._id}`} className="px-2 py-1 bg-yellow-700 rounded-sm text-white mx-2 "><RxUpdate/></Link>
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
    </div>
    </div>
  )
}

export default MarktingProfilPage