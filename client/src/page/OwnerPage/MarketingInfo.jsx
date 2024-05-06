import React, { useEffect, useState } from 'react';
import Navbar from '../../component/Navbarl';
import { Link } from 'react-router-dom';
import axios from "axios";
import Footer from '../../component/Footer';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

function MarketingInfo() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/server/MarketingActivity/getAllDetails")
      .then((result) => {
        console.log("data: ", typeof result.data.data); // Check the fetched data
        console.log("data: ", Object.values(result.data.data)); // Check the fetched data
        setUsers(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors
  }, []);
//pdf generation
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Advertisement name", "Description", "Start Duration","End Duration"];
    const tableRows = [];

    users.forEach((item) => {
      const rowData = [item.name, item.des, item.duration,item.duratione];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("Advertisement.pdf");
  };
/**delete */
  const deleteReview = async (userId) => {
    await axios.delete(`http://localhost:3001/server/MarketingActivity/deleteDetailsById/${userId}`)
      .then((response) => {
        console.log("AdDelete", response.data);
        // After deleting, you might want to update the state to remove the deleted item from the UI
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div> 

    <Navbar/>
    <div className=''>
        {/* Header */}
       
      </div>
      <div className=''>
        {/* Added green background */}
        <div className='flex flex-row'>
          <div className="flex w-[300px] h-[1200px] bg-lime-900">
          
            <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/OwnerPage">User Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Supplier Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Inventory Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Staff Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Shipment Infor</Link>
            </button>
            <button className="w-[230px] h-[40px]  bg-gray-500 text-white  rounded-2xl text-center my-3">
              <Link to="/MarketingDetailsShowpage">Promotion Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Payment Infor</Link>
            </button>
          </div>
          </div>
         
          <div className='ml-4 w-full lg:w-3/4 xl:w-4/5'>
          <div className='ml-4 w-full lg:w-3/4 xl:w-4/5'>
          <div>
            <button className='bg-yellow-500 text-white py-2 px-4 rounded-md mb-4  ml-3 inline-block' onClick={generatePDF} disabled={users.length === 0}><FaFilePdf /></button> 
            </div>
</div>
            <table className="border-collapse ml-[100px] border w-[990px]" cellSpacing={0}>
              <thead>
                <tr className=''>
                  <th className="border border-green-500 px-4 py-2">S.No.</th>
                  <th className="border border-green-500 px-4 py-2">Advertisement name</th>
                  <th className="border border-green-500 px-4 py-2">Description</th>
                  <th className="border border-green-500 px-4 py-2">Start Duration</th>
                  <th className="border border-green-500 px-4 py-2">End Duration</th>
                  <th className="border border-green-500 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="border border-green-500 px-4 py-2">{index + 1}</td>
                    <td className="border border-green-500 px-4 py-2">{user.name}</td>
                    <td className="border border-green-500 px-4 py-2">{user.des}</td>
                    <td className="border border-green-500 px-4 py-2">{user.duration}</td>
                    <td className="border border-green-500 px-4 py-2">{user.duratione}</td>
                    <td className='border border-green-500 px-4 py-2'>
                   
                      <button className="text-red-600 hover:text-red-800 ml-2" onClick={() => deleteReview(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Footer */}
        <div className='w-auto h-[100px] items-end'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MarketingInfo