import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineBackward } from "react-icons/ai"; //back button
import { Link, useNavigate } from 'react-router-dom';
const CashD = () => {
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

  

  //Customer detals varanum
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
      // If the error is an object, stringify it to get useful information
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
             <Link to='/'> 
             <AiOutlineBackward className=' text-2xl'/>
             </Link>
          </div>
       <h1 className='text-center font-bold text-2xl  '>Cash Payment</h1>
       <label className='my-10 font-bold  '>
               Customer's Name:<br/> </label>
      <input className="w-full p-2 mb-4 border rounded" 
          type="text" 
          placeholder='enter the name '
          value={name} 
         onChange={(e) => setName(e.target.value)} />
  <br/>

       <label className='font-bold'>
       Phone Number:<br/> 
       </label>  
        <input 
            className="w-full p-2 mb-4 border rounded" 
           type="number" 
           placeholder='0771234567'
           value={Phone} 
           onChange={(e) => setPhone(e.target.value)} 
          onBlur={(e) => {
              const enteredPhone = e.target.value;

              if (phoneWithoutSpaces.length !== 10) {
             // If phone number does not meet the requirements
             setPhone('');
             alert('Your phone number is unavailable. Please enter a 10-digit number.');
    }
  }}
/>

 
  <br/>
  <label className='font-bold'>
    Address:<br/></label>
    <textarea className="w-full p-2 border rounded"
    value={Address}
    placeholder='Exact Location'
    onChange={(e) => setAddress(e.target.value)} />
  
  <br/>

  {/* <p className='font-bold mt-4'>Total ammount: </p> */}
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
                          <td className="border border-gray-300 px-4 py-2 ">tea</td>
                          <td className="border border-gray-300 px-4 py-2">500g</td>
                          <td className="border border-gray-300 px-6 py-2">{product.qty}</td>
                          <td className="border border-gray-300 px-5 py-2 ">100.00</td>
                         
                      </tr>
                  ))}
              </tbody>
          </table>
                    <div className='bg-gray-300 my-3  font-bold text-center text-gray-500'>"if you buy the products,delivery person<br/>
      will delivery the product and make the payment"</div>


          </form>
          
</div>
);
};

export default CashD;
