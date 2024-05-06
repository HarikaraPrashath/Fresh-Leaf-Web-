import React,{ useState, useEffect }from 'react'
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import tea from '../assets/tea.jpg';
import { Link } from 'react-router-dom';
import axios from "axios";


function ProductShowPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3001/server/inventoryapi/inventoryGetAll") // Provide the correct URL here
        .then((result) => {
          console.log("data: ", typeof result.data.data); // Check the fetched data
          console.log("data: ", Object.values(result.data.data)); // Check the fetched data
          setUsers(result.data ? Object.values(result.data.data) : []);
        })
        .catch((err) => console.error(err)); // Log any errors
    }, []);
  return (
    <div>
    <Navbar/>
    <h1 className='text-center  my-8 text-5xl'>Product List</h1>
    <div className="flex flex-wrap gap-6 justify-center my-9 w-full"> {/* Adjusted gap and container width */}
  {users.map((user) => ( /* Changed key to ensure it's not based on index */
    <div key={user._id} className="flex bg-white shadow-lg rounded-3xl w-[550px] h-[250px] overflow-hidden transition-transform transform hover:scale-105"> {/* Hover effect */}
      <img src={tea} alt="tea" className="w-48 h-48 object-cover p-4" /> {/* Ensured the image fits the container */}
      <div className="flex-1 flex flex-col justify-between px-6 py-6"> {/* Adjusted padding */}
        <div>
          <h1 className="font-bold text-gray-800 text-2xl">{user.name}</h1> {/* Changed text color */}
          <p className="text-lg text-gray-600 mt-4">{user.des}</p> {/* Reduced font size */}
          <p className="text-center font-bold p-2 text-3xl text-gray-700">{user.price}</p> {/* Adjusted font size */}
        </div>
        <div className="flex justify-end"> {/* Moved the button to the end */}
          <Link 
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-6 text-lg py-2 mr-4" 
            to={`/pageone/${user._id}`} /* Added hover effect */
          >
            Get Now
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>


    <Footer/>
    </div>
  )
}

export default ProductShowPage