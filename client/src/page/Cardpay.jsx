import React, { useEffect, useState } from 'react';
import { AiOutlineBackward } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' 

const CashDelivery = () => {
  
  //customer details varanum
  const [name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Totalprice, setTotalPrice] = useState('');

  //product manager detalis 
  const [PMProduct, setPMProduct] = useState([]);

  // const [Pname, setPname] = useState('');
  // const [weight , setWeight] = useState('');
  // const [qty, setQty] = useState('');
  // const [price, setprice] = useState('');

  const navigate = useNavigate();

  

  //Customer detals 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/server/Productmanage/CreateOrderProductDetails', {
        name,Phone,Address,Totalprice,
      });

      if (response.status === 201) {
        console.log(response.data);
        alert('Product created successfully!');
        navigate('/Shipment');
      } else {
        throw new Error(response.statusText || 'Failed to create product');
      }
    } catch (error) {
      // If the error, stringify it to get useful information
      const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
      console.error('Error creating product:', errorMessage);
      alert('Failed to create product. Please try again.');
    }
  };


  //Product Manager detals varanum
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

  return (
    <div className='bg-gray-200 mx-[200px] my-10 px-[80px] py-[40px] font-serif'>
      <form onSubmit={handleSubmit}>
    <div className="bg-green-700 text-white p-2 rounded-[20px]  mr-[690px] ml-2">
       <Link to='/mainProducts'> 
       <AiOutlineBackward className=' text-2xl'/>
       </Link>
    </div>
    <h1 className='text-center font-bold text-2xl  '>Card  Payment</h1>
    <label className='my-10 font-bold '>
      Customer's Name:<br/> </label>
      <input className="w-full p-2 mb-4 border rounded" 
      type="text" 
      value={name} 
      placeholder='Name'
      onChange={(e) => setName(e.target.value)} />
   
    <br/>
    <label className='font-bold'>
  Phone Number:<br/> 
</label>
<input 
  className="w-full p-2 mb-4 border rounded" 
  type="text" 
  placeholder='0771234567'
  value={Phone} 
  onChange={(e) => {
    const inputPhone = e.target.value;
    // Remove any non-numeric characters from the input
    const cleanedPhone = inputPhone.replace(/\D/g, '');
    // Check if the cleaned phone number has exactly 10 digits
    if (cleanedPhone.length <= 10) {
      setPhone(cleanedPhone);
    }
  }} 
/>

   
    <br/>
    <label className='font-bold'>
      Address:<br/></label>
      <textarea className="w-full p-2 border rounded"
      value={Address}
      placeholder='excat Loction'
      onChange={(e) => setAddress(e.target.value)} />
    
    <br/>

    <label className='font-bold'>
      Total ammount:<br/>
      {/* <textarea className="w-full p-2 border rounded"
      value={Totalprice}
      onChange={(e) => setTotalPrice(e.target.value)} /> */}
    </label>
    <br/>
    
    <div className="buttons">
      <button className="bg-green-700 text-white px-4 py-2 rounded-md ml-[300px]" >Order Now</button>
    </div>

    <table className="addtocart-table my-3 mx-[150px]">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-6 py-2">Product</th>
                  <th className="border border-gray-400 px-6 py-2">Weight</th>
                  <th className="border border-gray-400 px-6 py-2">Count</th>
                  <th className="border border-gray-400 px-6 py-2">Price</th>
                  
                </tr>
              </thead>
              <tbody>
                    {PMProduct.map((product, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2 ">Carbal tea leaves</td>
                            <td className="border border-gray-300 px-4 py-2">500g</td>
                            <td className="border border-gray-300 px-6 py-2">{product.qty}</td>
                            <td className="border border-gray-300 px-5 py-2 ">100.00</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

                      <div className='bg-gray-300 my-3  py-2 font-bold text-center text-gray-500'>"if you buy the products,payment to card<br/>
        after delivery person delivary your "ORDER".</div>


            </form>
            
  </div>
  );
};

export default CashDelivery;