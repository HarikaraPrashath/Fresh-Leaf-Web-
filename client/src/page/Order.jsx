import { Link } from "react-router-dom";
import { AiOutlineBackward } from "react-icons/ai"; //back button

export default function ({ products = [] }) {
 
    return (
      <div className='bg-gray-200 mx-[200px] my-11 px-[40px] py-[20px] rounded-[25px] font-serif'>
      <div  className="bg-green-700 opacity-80 text-white px-2 py-2 rounded-[40px] mr-[800px]">
      <Link to='/pageone'><AiOutlineBackward className=' text-2xl'/></Link>  
      </div>  
      
        <table className="addtocart-table my-3 mx-[150px]">
              <thead>
                <tr>
                  <th className="border border-gray-300 w-[200px] px-1 py-2">Product</th>
                  <th className="border border-gray-300 px-6 py-2">Weight</th>
                  <th className="border border-gray-300 px-6 py-2">Count</th>
                  <th className="border border-gray-300 px-6 py-2">Price</th>
                  
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.weight}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.qty}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
    <div><h3 className="text-lg font-bold mb-4 mx-[200px]">Total prize is:</h3></div>
    <div className="flex mb-4 mx-[160px]">
    
    {/* link to chash payment */}
      <Link to='/CashD' className="bg-green-700 text-white px-4 py-2 rounded-md mr-[50px]">
        Cash on Delivery
      </Link>
      {/* link to cardpayment */}
      <Link to='/Cardpay' className="bg-green-700 text-white px-4 py-2 rounded-md">
        Card Payment
      </Link>
    </div>
     </div>
    );
  };
  





