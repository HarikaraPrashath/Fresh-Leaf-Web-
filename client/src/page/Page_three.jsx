import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import greenTea from '../assets/greenTea.jpg'; // import image here
import { Link } from 'react-router-dom'; // Import Link component
import { MdClose } from 'react-icons/md';      // Import the close icon

export default function Page_three() {
    const { id } = useParams(); // Retrieve the id parameter from the URL
    const [qty, setQty] = useState("");
    
    
    useEffect(() => {
        axios
          .get(`http://localhost:3001/server/Productmanage/productGetOne/${id}`)
          .then((result) => {
            console.log("data Calling",result);
   
            setQty(result.data.data.qty);
          })
          .catch((err) => console.log(err));
      }, [id]);
    
      const handleUpdate = (e) => {
        e.preventDefault();
        axios
          .put(`http://localhost:3001/server/Productmanage/productUpdate/${id}`, {
            qty,
          })
          .then((result) => {
            console.log(result);
            alert("Product details successfully updated");
            // You can redirect to another page or perform any other action upon successful update
          })
          .catch((error) => {
            console.error(' not update :', error);
          });
      };

  return (
  <div font-serif>
      <form onSubmit={handleUpdate}>
        <div className='bg-gray-300 my-[30px] mx-[150px] p-[20px] rounded-[20px]'>
        
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1' }}>
                <img src={greenTea} alt="Product" className=' w-[300px] h-[300px]'/>
              </div>
                    <div style={{ flex: '2', paddingLeft: '20px' }}>
                        <div className="bg-red-500 p-2 rounded-full pr-2 ml-[650px]">
                            <Link to='/pagetwo' className="text-white" ><MdClose/></Link>
                        </div>
                        <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Fixni Tea leaves</h1>
                        <p style={{ marginTop: '10px' }}>
                            Experience the art of tea-making with our handpicked tea leaves,
                            each offering a unique blend of flavors that will elevate your
                            tea-drinking experience.
                        </p>
                        <div className='text-2xl'>Rs.500</div>
                        
                            <div className='text-2xl m-2' style={{ display: 'flex', alignItems: 'center', }}>
                                  <input
                                      type="number"
                                      
                                       pattern="[0-9]*"
                                       placeholder="size"
                                       style={{ width: '60px' }}
                                        min="0"
                                       max="99"
                                       value={qty}
                                       onChange={(e) =>setQty(e.target.value)}
                                   />
                            </div>
                        
                            
                                <button className='bg-green-800 text-white w-[100px] text-center  py-2 rounded-md ml-[250px] mt-10 cursor-pointer hover:opacity-80'>Add </button>
                                </div>
                             </div>
               </div> 
                 
      </form>       
</div>
  );
}
