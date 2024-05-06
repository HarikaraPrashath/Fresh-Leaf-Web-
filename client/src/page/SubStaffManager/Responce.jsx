import React , {useState,useEffect} from 'react'
import Navbar from '../../component/Navbarl'
import { Link } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { IoSend } from "react-icons/io5";


function Responce() {
  const [inputItem, setInputItem] = useState("");
  const [UserProfile, setUserProfile] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/server/staffRequest/requestGetAll")
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
    axios.delete(`http://localhost:3001/server/staffRequest/requestDelete/${id}`)
    .then(res=>{console.log(res)
        window.location.reload()
    } )
    .catch(err=>console.log(err))
  }


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
         "http://localhost:3001/server/staffRequest/requestDetailsStaff",
        {
          inputItem
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("User Details created successfully!");
        navigate("\request");
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
        <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/StaffManagerAccountShowDetails">StaffManagerAccount</Link></button>
            <button className='w-[230px] h-[40px]  bg-gray-200 rounded-2xl text-center my-3'><Link to="/PaymentInforStaffMan">Payment Infor</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'><Link to="/Responce">Responce</Link></button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'><Link to="/AllStaffGet">Staff Infor</Link></button>

        </div>
      </div>
      <div>
        <h1 className='text-center text-3xl'>Request</h1>
         
          <form className='px-6 py-8' onSubmit={handleSubmit}>
            <input
            placeholder='Reson for Time off......  '
            className='px-5 py-3 w-[900px] ml-[100px]'
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
            /><br/> <br/>
            <button className='bg-green-900 text-white px-3 py-1 ml-[900px] rounded-lg'> <IoSend  className='w-6 h-6'/></button>
          </form>


      
        <h1 className='text-center text-3xl mb-2'>Show all request</h1>
      
        <div className="flex justify-center ml-20">
  <div className="justify-around-center">
    {UserProfile.map((profile, index) => (
      <div key={index} className='flex min-h-[20px] w-[1000px] mx-2 my-2 bg-gray-200 justify-between text-center rounded-md'>
        <div className='px-2 py-1'>
          <p>{profile.inputItem}</p>
        </div>
        <div >
          <button className="px-2 py-1 text-white mx-2 mb-2 mr-2" onClick={(e)=>handleDelete(profile._id)}>
            <IoIosCloseCircle className='text-red-900 w-5 h-5 flex justify-end'/>
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

        
      </div>
    </div>
  </div>
  )
}

export default Responce