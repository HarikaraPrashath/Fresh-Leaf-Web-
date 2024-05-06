import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import greenTea from '../assets/greenTea.jpg'; // import image here
import Navbar from '../component/Navbar'; //Navbar
import { MdClose } from "react-icons/md"; //close tag

export default function Page_one() {
  const [qty, setQty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/server/Productmanage/productCreate', {
        qty,
      });

      if (response.status === 201) {
        console.log(response.data);
        alert('Product created successfully!');
        navigate('/pageone');
      } else {
        throw new Error(response.statusText || 'Failed to create product');
      }
    } catch (error) {
      // If the error is an object, stringify it to get useful information
      const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
      console.error('Error creating product:', errorMessage);
      alert('Failed to create product. Please try again.');
    }
  };

  return (
    <div className='font-serif'>
        <Navbar/>
        <form onSubmit={handleSubmit}>
            <div className='bg-gray-200 p-[20px] ml-[120px] mr-[120px] rounded-[25px]'>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1' }}>
                    <img src={greenTea} alt="Product" className="w-72 h-72 rounded-lg" />

                    </div>
                    <div style={{ flex: '2', paddingLeft: '20px' }}>
                        <div className="bg-red-500 p-2 rounded-full pr-2 ml-[650px]">
                            <Link to='/' className="text-white text-2xl" ><MdClose /></Link>
                        </div>
                        <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Carbal Tea leaves</h1>
                        <p  className='mt-[10px]'>
                            Experience the art of tea-making with our handpicked tea leaves,
                            each offering a unique blend of flavors that will elevate your
                            tea-drinking experience.
                        </p>
                        <div className='text-2xl '>Rs.500</div>
                        <div  className='text-2xl flex my-2'>
                                <input
                                    type="number"
                                    placeholder="Count"
                                    style={{ width: '80px' }}
                                    min="1"
                                    max="99"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                        </div>
                        <button type="submit" className='bg-green-800 text-white w-[100px] text-center  py-2 rounded-md ml-10 mr-10 mt-10 cursor-pointer hover:opacity-80'>Add to cart</button>
                        <button className='bg-green-800 text-white w-[100px] text-center px-10 py-2 rounded-md ml-10 mr-10 mt-10 cursor-pointer hover:opacity-80'>Pay</button>         
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}
