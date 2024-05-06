import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function Shipment() {

    const [PMOrderProduct, setPMOrderProduct] = useState([]);

    //product manager details kku
    const [PMProduct, setPMProduct] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/server/Productmanage/OrderproductGetAll")
          .then((result) => {
            console.log("data: ", typeof result.data.data); // Check the fetched data
            console.log("data: ", Object.values(result.data.data)); // Check the fetched data
            setPMOrderProduct(result.data ? Object.values(result.data.data) : []);
          })
          .catch((err) => console.error(err)); // Log any errors
    
          console.log(PMOrderProduct,"data calling")
    }, []);
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/server/Productmanage/OrderproductDelete/${id}`)
        .then(res => {
            console.log(res)
            alert('Details deleted successfully!');
            window.location.reload();
        })
        .catch(err => console.log(err))
    }


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
    <div className='font-serif'>
                   <p className='p-[20px], m-[20px]'>
                    {PMOrderProduct.map((pOroduct, index) => (
                        <p className='items-center  flex-grow' key={index}>
                            <p className='p-4'>Name:<br/>{pOroduct.name}</p>
                            <p>Phone:<br/>{pOroduct.Phone}</p>
                            <p>Address:<br/>{pOroduct.Address}</p>
                            <p>Totalprice:<br/>{pOroduct.Totalprice}</p>

                            {/* <p>Product Name:<br/>{pOroduct.Pname}</p>
                            <p>Weight:<br/>{pOroduct.weight}</p>
                            <p>Count:<br/>{pOroduct.qty}</p>
                            <p>Price:<br/>{pOroduct.price}</p> */}
                            
                            <td className="flex border border-gray-300 px-5 py-2">
                                <button className="btn-delete bg-red-500 text-white px-3 py-1 rounded-md" onClick={(e) => handleDelete(pOroduct._id)}>Delete</button>
                            </td>
                     
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
            </p>
                    ))}
                </p>
    </div>
  )
}


   
   
