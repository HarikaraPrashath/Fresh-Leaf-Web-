import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import axios from 'axios';
import { AiOutlineBackward } from "react-icons/ai";
export default function Page_two() {
    const [PMProduct, setPMProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); //search
   
    useEffect(() => {
        axios.get("http://localhost:3001/server/Productmanage/productGetAll")
          .then((result) => {
            console.log("data: ", typeof result.data.data); // Check the fetched data
            console.log("data: ", Object.values(result.data.data)); // Check the fetched data
            setPMProduct(result.data ? Object.values(result.data.data) : []);
          })
          .catch((err) => console.error(err)); // Log any errors
    
          console.log(PMProduct,"data calling")
    }, []);
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/server/Productmanage/productDelete/${id}`)
        .then(res => {
            console.log(res)
            alert('Details deleted successfully!');
            window.location.reload();
        })
        .catch(err => console.log(err))
    }
//searc
    const filteredPage_two = PMProduct.filter((Pagetwo) =>  
 
    Pagetwo.qty.toLowerCase().includes(searchTerm.toLowerCase())

  );

    return (
    <div>

          <div className='bg-gray-200 mx-[250px] my-[50px] py-1 rounded-[30px]'>
                <div  className="bg-green-700 opacity-80 text-white px-[10px] py-[10px] rounded-[30px] ml-[20px] mr-[750px] mt-[20px]">
                    <Link to='/'><AiOutlineBackward className=' text-2xl'/></Link>  
                    <div className="absolute top-2 right-8"></div> 
                </div> 
               <h1 className='text-2xl mx-[120px] py-1'>Add to cart things..</h1>

                           {/* Search bar */}
            <div className="relative ">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Search icon */}
                  <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-6 w-6 text-gray-400"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                   >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                 />
                  </svg>
            </div>
                          <input
                             type="text"
                             placeholder="Search "
                             value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}
                             className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-transparent"
                           />
        </div>


               <table className="addtocart-table  mx-[100px]">
                  <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product</th>
                        <th className="border border-gray-300 px-4 py-2">Weight</th>
                        <th className="border border-gray-300 px-6 py-2">Price</th>
                        <th className="border border-gray-300 px-5 py-2">Count</th>
                        <th className="border border-gray-300 px-5 py-2">Total Ammount</th>
                        <th className="border border-gray-300 px-5 py-2 w-[220px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPage_two.map((product, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2 ">tea</td>
                            <td className="border border-gray-300 px-4 py-2">500g</td>
                            <td className="border border-gray-300 px-6 py-2">100.00</td>
                            <td className="border border-gray-300 px-5 py-2 ">{product.qty}</td>
                            <td className="border border-gray-300 px-5 py-2 ">Rs.{(product.qty * 100.00)}</td>
                            
                            <td className="flex border border-gray-300 px-5 py-2">
                                <Link to={`/pagethree/${product._id}`} className="btn-update bg-green-500 text-white px-3 py-1 rounded-md ml-4 mr-4">Update</Link>
                                <button className="btn-delete bg-red-500 text-white px-3 py-1 rounded-md" onClick={(e) => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
               </table>
            <br/>
            <h1 className='text-2xl mx-[180px] mt-3'>Total Prize: </h1>
               <div className='mx-[200px] my-6'>    
                <Link to='/CashD' className="bg-green-700 text-white px-4 py-2 rounded-md mr-4">
                    Cash on Delivery
                </Link>
                <Link to='/Cardpay' className="bg-green-700 text-white px-4 py-2 rounded-md">
                    Card Payment
                </Link>
            </div>
    </div>
        </div>
    );
}
