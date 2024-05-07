import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import axios from 'axios';
import Navbar from '../../../component/Navbar';


export default function InventryUpdateform() {
    const { id } = useParams(); // Retrieve the id parameter from the URL

    const [pcode, setPcode] = useState([]);
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [des, setdes] = useState([]); // Corrected spelling
    
    // gete data
    useEffect(() => {
        axios
          .get(`http://localhost:3001/server/inventoryapi/inventoryGetOne/${id}`)
          .then((result) => {
            console.log("data Calling",result);
    
            setPcode(result.data.data.pcode);
            setName(result.data.data.name);
            setQty(result.data.data.qty);
            setPrice(result.data.data.price);
            setdes(result.data.data.des);
          })
          .catch((err) => console.log(err));
      }, [id]);
    
      // update code
      const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:3001/server/inventoryapi/inventoryUpdate/${id}`, {
            pcode,
            name,
            qty,
            price,
            des 
          })
          .then((result) => {
            console.log(result);
            alert("Product details successfuly update");
            // You can redirect to another page or perform any other action upon successful update
          })
          .catch((error) => {
            console.error('Product not update :', error);
          });
      };
    
  return (
<div >                    
     
    <Navbar/>

      <div className='flex flex-row' >
        <div className='w-[20%] h-[500px] flex-grow border'>
          <div className=" w-1/2 bg-white bg rounded p-3 ml-[300px]">
            <h2 className=" text-2xl font-bold mb-4 font-serif">Update Product</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label htmlFor="">ID</label>
                <input
                  type="text"
                  placeholder="Enter the Id"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setPcode(e.target.value)}
                  value={pcode}
                />
              </div>
              <div className="mb-2 "> 
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Enter the name"
                  className="w-full p-2 border rounded "
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-2 ">
                <label htmlFor="">Qty</label>
                <input
                  type="number"
                  placeholder="Enter the Qty"
                  className="w-full p-2 border rounded "
                  onChange={(e) => setQty(e.target.value)}
                  value={qty}
                />
              </div>
              <div className="mb-2 ">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  placeholder="Enter the price"
                  className="w-full p-2 border rounded "
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="mb-2 ">
                <label htmlFor="">Description</label>
                <input
                        type="text"
                        placeholder="Enter the Description"
                        className="w-full p-2 border rounded"
                        value={des}
                        onChange={(e) => setdes(e.target.value)}
                />
              </div>
              <button className='w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-96 mt-6'>Update</button>
            </form>
            <div className='flex flex-row p-3 justify-between font-serif'>
            </div>
          </div>
        </div>
      </div>
    </div>  )
}
