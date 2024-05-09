import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';
import Navbar from '../component/Navbarl';
import { RxUpdate } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { FaFilePdf } from "react-icons/fa";
import axios from 'axios';
import { FaFileExcel } from "react-icons/fa6"

function OwnerPage() {
  const [filteredProfile, setFilteredProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/server/userInfo/userInfoGet')
      .then((result) => {
        console.log('data: ', typeof result.data.data); // Check the fetched data
        console.log('data: ', Object.values(result.data.data)); // Check the fetched data
        setFilteredProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err)); // Log any errors
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/server/userInfo/userInfoDelete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  const downloadExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('User Information Data');

    // Define the columns for the Excel worksheet
    worksheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Mobile', key: 'mobile' },
      { header: 'City', key: 'city' },
      { header: 'Postal Code', key: 'postalCode' },
    ];

    // Add the data to the worksheet
    filteredProfile.forEach((profile, index) => {
      worksheet.addRow({
        sno: index + 1,
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile,
        city: profile.city,
        postalCode: profile.posterCode,
      });
    });

    // Write the workbook to a buffer and trigger the download
    workbook.xlsx.writeBuffer().then((buffer) => {
      FileSaver.saveAs(
        new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        'user_information.xlsx'
      );
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const imgData = Logo; 
    doc.addImage(imgData, 'JPEG', 150, 10, 45, 25); 
    doc.setFontSize(5);
    doc.setFont("serif");
    doc.text("FRESH LEAF:Since 1960 ", doc.internal.pageSize.width / 2, 45, { align: 'center' }); 
    doc.setFontSize(5);

    
    const tableColumn = ['User name', 'Email', 'Mobile NO', 'City', 'Poster Code'];
    const tableRows = [];

    filteredProfile.forEach((item) => {
      const rowData = [item.name, item.email, item.mobile, item.city, item.posterCode];
      tableRows.push(rowData);
    });
    // Auto-table generation
    const startY = 80; // Adjust this value to move the table downwards
    doc.autoTable(tableColumn, tableRows, { startY: startY }); // Add margin-top to move the table downwards
    const fixedDate = new Date().toLocaleString(); // Current date and time
   
   // Line for signature
   doc.line(5, startY - 8, doc.internal.pageSize.width - 25, startY - 8); 
   doc.setFontSize(12);
   doc.text("Signature: ________", 10, startY-20); 




    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('User_Information_data.pdf');
  };6

  // Filtering profiles based on search term
  const filteredProfiles = filteredProfile.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.mobile.includes(searchTerm) ||
    profile.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.posterCode.includes(searchTerm)
  );
  return (
    <div className="flex flex-col h-screen">
      
      <Navbar/>
      <div className='flex flex-1'>
        <div className='flex w-[300px] h-[650px] bg-lime-900'>
          <div className='p-5'>
            <button className='w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3'>
              <Link to='/UserInfo'>User Infor</Link>
            </button>

            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'>
              <Link to='/SupplierInfo'>Supplier Infor</Link>
            </button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'>
              <Link to='/inventryProfile'>Inventory Infor</Link>
            </button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'>
              <Link to='/StaffInforClient'>Staff Infor</Link>
            </button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'>
              <Link to='/'>Shipment Infor</Link>
            </button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'>
              <Link to='/MarketingDetailsShowpage'>Promotion Infor</Link>
            </button>
            <button className='w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3'>
              <Link to='/'>Payment Infor</Link>
            </button>
          </div>
        </div>
        <div className='w-[900px] pr-4 pl-4\3 ml-5'>
          <div className='mr-4 pr-4'>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-[200px] h-[30px] border border-gray-300 rounded-md px-2"
            />
            <button className='  w-[150px] h-[40px] bg-green-900 text-white rounded-xl text-center ml-6 mt-6'>
              <Link to='/UserAccount'>create</Link>
            </button>
            <div className='flex ml-[900px]'>
            <div className="flex justify-end mr-10"> {/* Aligning to the right and providing a right margin */}
  <button
    className="flex items-center gap-1 w-[150px] h-[50px] bg-blue-900 text-white rounded-xl text-center mt-6 transition-all duration-200 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed"
    onClick={generatePDF}
    disabled={filteredProfile.length === 0}
  >
    <FaFilePdf className="w-5 h-5 ml-2" /> {/* PDF icon */}
    <span>Download</span> {/* Text */}
  </button>

  <button
    className="flex items-center gap-2 w-[150px] h-[50px] bg-green-900 text-white rounded-xl text-center mt-6 ml-5 transition-all duration-200 hover:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed"
    onClick={downloadExcel}
    disabled={filteredProfile.length === 0}
  >
    <FaFileExcel className="w-5 h-5 ml-3" /> {/* Excel icon */}
    <span>Download</span> {/* Text */}
  </button>
</div>
</div>
          </div>
          <br></br>
         
         <div className=' w-[1000px] ml-20'>
         <table className=' border'>
            <thead>
              <tr className='bg-gray-200'>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>PosterCode</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile, index) => (
                <tr key={index}>
                  <td className='px-10'>{profile.name}</td>
                  <td className='px-10'>{profile.email}</td>
                  <td className='px-10'>{profile.mobile}</td>
                  <td className='px-10'>{profile.city}</td>
                  <td className='px-10'>{profile.posterCode}</td>
                  <td className='border p-2 flex items-center justify-around'>
                    {/* <Link
                      to={`/userAccountUpdate/${profile._id}`}
                      className='px-2 py-1  bg-yellow-700 rounded-sm text-white  flex items-center'
                    >
                      <RxUpdate className='mr-1' /> Update
                    </Link> */}
                    <button
                      className='px-2 py-1 bg-red-700 rounded-sm  text-white mx-2 flex items-center '
                      onClick={(e) => handleDelete(profile._id)}
                    >
                      <RiDeleteBin6Line className='mr-1' />Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
        </div>
      </div>

      <div className='w-[1300px] mt-auto'></div>
      <Footer />
    </div>
  
  )
}

export default OwnerPage