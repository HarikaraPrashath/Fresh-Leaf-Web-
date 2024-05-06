import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';        // Import Link component
import Navbar from '../component/Navbar';
import { FaStar } from 'react-icons/fa';
import greenTea from '../assets/greenTea.jpg';
import { MdClose } from 'react-icons/md';      // Import the close icon
import axios from 'axios';

export default function Seeproduct() {
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
        navigate('/pagetwo');
      } else {
        // Handle non-200 status codes
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
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: '#D9D9D9', padding: '20px', marginLeft: '120px', marginRight: '120px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1' }}>
                    {/* image */}
                     <img src={greenTea} alt="Product"  className='w-[300px] h-[300px] rounded-[20px]' />     
                    <div style={{ flex: '2', paddingLeft: '20px' }}>
          
                        <div className="bg-red-500 p-2 rounded-full pr-2 ml-[650px]">
                            <Link to='/' className="text-white" ><MdClose /></Link>
                        </div>

                        <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Fixni Tea leaves </h1>
                        <p style={{ marginTop: '10px' }}>Experience the art of tea-making with our handpicked tea leaves,<br />
                        each offering a unique blend of flavors that will elevate your<br /> tea-drinking experience.</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="number"
                                    pattern="[0-9]*"
                                    placeholder="size"
                                    style={{ width: '60px' }}
                                    min="0"
                                    max="99"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                        </div>
                        <p className="mt-4 text-lg">Flavour of Sri Lanka</p>
                   
                        <Link to="/pageone" className='bg-green-800 text-white  w-[100px] text-center  px-10 py-2 rounded-md ml-10  mr-10 mt-10 cursor-pointer hover:opacity-80 '>Add to cart</Link>
                        <Link to='/Order' className='bg-green-800 text-white  w-[100px] text-center  px-10 py-2 rounded-md ml-10  mr-10 mt-10 cursor-pointer hover:opacity-80 '>Pay</Link>
                    </div>
                </div>
            </div>
        </div>     
      </form>
    </div>
  );
}
