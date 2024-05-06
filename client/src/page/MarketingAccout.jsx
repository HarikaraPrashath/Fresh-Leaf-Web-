import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from '../component/Footer';
import Navbar from '../component/Navbarl';
import { Link } from 'react-router-dom';
import jsPDF from "jspdf";
import ExcelJS from 'exceljs';
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";
import FileSaver from 'file-saver';
import { FaFileExcel } from "react-icons/fa6"
import Logo from '../assets/Logo.png'

function MarketingAccount() {
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

//excel 
  const downloadExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Advertisement Data');
  
    // Define the columns for the Excel worksheet
    worksheet.columns = [
      { header: 'S.No.', key: 'sno' },
      { header: 'Advertisement Name', key: 'name' },
      { header: 'Description', key: 'des' },
      { header: 'Start Duration', key: 'duration' },
      { header: 'End Duration', key: 'duratione' },
    ];
  
    // Add the data to the worksheet
    users.forEach((user, index) => {
      worksheet.addRow({
        sno: index + 1,
        name: user.name,
        des: user.des,
        duration: user.duration,
        duratione: user.duratione,
      });
    });
  
    // Set the style for the header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  
    // Write the workbook to a buffer and trigger the download
    workbook.xlsx.writeBuffer().then((buffer) => {
      FileSaver.saveAs(
        new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        'advertisement_data.xlsx'
      );
    });
  };


 // report generatePath

 const generateReportPDF = () => {
  const doc = new jsPDF();
  const imgData = Logo; 
  doc.addImage(imgData, 'JPEG', 150, 10, 45, 25); 
  doc.setFontSize(20);
  doc.setFont("serif");
  doc.text("FRESH LEAF:Since 1960 ", doc.internal.pageSize.width / 2, 45, { align: 'center' }); 
  
  doc.setFontSize(10);
  const tableColumn = ["Advertisement name", "Description", "Start Duration", "End Duration"];
  const tableRows = users.map(user => [
    user.name,
    user.des,
    user.duration,
    user.duratione,
 

  ]);

  
  // Auto-table generation
  const startY = 80; // Adjust this value to move the table downwards
  doc.autoTable(tableColumn, tableRows, { startY: startY }); // Add margin-top to move the table downwards
  
  const fixedDate = new Date().toLocaleString(); // Current date and time
  doc.text(fixedDate, 10, 10, { align: 'left' }, startY + 20);
  // Adjust coordinates as needed
  
  
  // Line for signature
  doc.line(5, startY - 8, doc.internal.pageSize.width - 25, startY - 8); 
  doc.setFontSize(12);
  doc.text("Signature: ________", 10, startY-20); 

  doc.save("Advertisement Details.pdf");
};

  const deleteReview = async (userId) => {
    await axios.delete(`http://localhost:3001/server/MarketingActivity/deleteDetailsById/${userId}`)
      .then((response) => {
        console.log("AdDelete", response.data);
        // After deleting, you might wanbt to update the state to remove the deleted item from the UI
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className=''>
        {/* Header */}
        <Navbar />
      </div>
      <div className=''>
        {/* Added green background */}
        <div className='flex flex-row'>
          <div className="flex w-[300px] h-[1200px] bg-lime-900">
            <div className="p-5">
              <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
                <Link to="/MarketingProfile">Profile</Link>
              </button>
              <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                <Link to="/MarketingPage">Activity</Link>
              </button>
              <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                <Link to="/paymentAddMarketing">Payment</Link>
              </button>
            </div>
          </div>
         
          <div className='ml-4 w-full lg:w-3/4 xl:w-4/5'>
            <div>
            <button className='bg-yellow-500 text-white py-2 px-4 rounded-md mb-4  ml-3 inline-block' onClick={generateReportPDF} disabled={users.length === 0}><FaFilePdf /></button> 
            <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      onClick={downloadExcel}
                    >
                    < FaFileExcel/>
                    </button>
            </div>
            <Link to={"/MarketingAddActivity"} className='bg-green-500 text-white py-2 px-4 rounded-md mb-4 inline-block'>Add Advertisement</Link>
            <table className="border-collapse border w-full" cellSpacing={0}>
              <thead>
                <tr className=''>
                  <th className="border border-green-500 px-4 py-2">S.No.</th>
                  <th className="border border-green-500 px-4 py-2">Advertisement name</th>
                  <th className="border border-green-500 px-4 py-2">Description</th>
                  <th className="border border-green-500 px-4 py-2">Start Duration</th>
                  <th className="border border-green-500 px-4 py-2">End Duration</th>
                  <th className="border border-green-500 px-4 py-2">Actions</th>
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
                    <Link to={`/MarketingUpdateActivity/${user._id}`} className="text-green-600 hover:text-green-800">Edit</Link>
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
  );
}

export default MarketingAccount;
