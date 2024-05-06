import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { jsPDF } from 'jspdf';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import Navbar from '../../component/Navbarl';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Logo from '../../assets/Logo.png';



function StaffInfor() {
  const [userProfile, setUserProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  // const downloadPDF = () => {
  //   const doc = new jsPDF();

  //   // Generate a simple table with headers and data
  //   doc.autoTable({
  //     head: [['Name', 'Email', 'Gender', 'Experience', 'Batch']],
  //     body: filteredUserProfiles.map((profile) => [
  //       profile.name,
  //       profile.email,
  //       profile.gender,
  //       profile.experience,
  //       profile.batch,
  //     ]),
  //   });

  //   // Save and download the PDF
  //   doc.save('staff_data.pdf');
  // };

  // report generatePath

  const generateReportPDF = () => {
    const doc = new jsPDF();
    const imgData = Logo; 
    doc.addImage(imgData, 'JPEG', 150, 10, 45, 25); 
    doc.setFontSize(20);
    doc.setFont("serif");
    doc.text("FRESH LEAF:Since 1960 ", doc.internal.pageSize.width / 2, 45, { align: 'center' }); 
    
    doc.setFontSize(10);
    const tableColumn = ["Name", "Email", "Gender", "Experience", "Batch",];
    const tableRows = filteredUserProfiles.map(profile => [
      profile.name,
      profile.email,
      profile.gender,
      profile.experience,
      profile.batch,
    ]);
  
    
    // Auto-table generation
    const startY = 80; // Adjust this value to move the table downwards
    doc.autoTable(tableColumn, tableRows, { startY: startY }); // Add margin-top to move the table downwards
    
    const fixedDate = new Date().toLocaleString(); // Current date and time
    doc.text(`Date: ${fixedDate}`, 10, 10,{align:'left'},startY + 20); // Adjust coordinates as needed
    
    // Line for signature
    doc.line(5, startY - 8, doc.internal.pageSize.width - 25, startY - 8); 
    doc.setFontSize(12);
    doc.text("Signature: ________", 10, startY-20); 
  
    doc.save("staff_data.pdf");
    };


  const downloadExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Staff Data');

    // Define columns
    worksheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Gender', key: 'gender' },
      { header: 'Experience', key: 'experience' },
      { header: 'Batch', key: 'batch' },
    ];

    // Add data rows
    filteredUserProfiles.forEach((profile) => {
      worksheet.addRow({
        name: profile.name,
        email: profile.email,
        gender: profile.gender,
        experience: profile.experience,
        batch: profile.batch,
      });
    });

    // Create an Excel file and trigger the download
    workbook.xlsx.writeBuffer().then((buffer) => {
      FileSaver.saveAs(
        new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        'staff_data.xlsx'
      );
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/server/StaffInfo/detailsStaffInfogetAll')
      .then((result) => {
        setUserProfile(result.data ? Object.values(result.data.data) : []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/server/StaffInfo/detailsStaffInfodelete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const filteredUserProfiles = userProfile.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex w-[300px] h-[1200px] bg-lime-900">
        <div className="p-5">
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/OwnerPage">User Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/SupplierInfo">Supplier Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/inventroyAddtoForms">Inventory Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-500  text-white rounded-2xl text-center my-3">
              <Link to="/staffInforClient">Staff Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Shipment Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/MarketingDetailsShowpage">Promotion Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Payment Infor</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center ml-36 text-3xl">Staff Details</h1>
          
<div className="container mx-auto w-[980px] my-6">
<div className="flex space-x-4 ml-[680px]">
              {/* Download Buttons */}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={downloadExcel}
              >
                Download Excel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={generateReportPDF}
              >
                Download PDF
              </button>
            </div>
  <div className="w-[1050px]   bg-white rounded-lg shadow-lg p-6 mx-auto ml-28">
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full border border-gray-300 p-3 rounded-lg mb-6"
    />

    <table className="w-full text-left">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-4">Name</th>
          <th className="p-4">Email</th>
          <th className="p-4">Gender</th>
          <th className="p-4">Experience</th>
          <th className="p-4">Batch</th>
          <th className="p-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUserProfiles.map((profile, index) => (
          <tr key={index} className="hover:bg-gray-100 transition-colors">
            <td className="px-6 py-4">{profile.name}</td>
            <td className="px-6 py-4">{profile.email}</td>
            <td className="px-6 py-4">{profile.gender}</td>
            <td className="px-6 py-4">{profile.exprience}</td>
            <td className="px-6 py-4">{profile.batch}</td>
            <td className="px-6 py-4 text-center flex justify-center space-x-4">
             
              <button
                className="px-3 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition"
                onClick={() => handleDelete(profile._id)}
              >
                <RiDeleteBin6Line className="inline mr-1" /> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>  
        </div>
      </div>
    </div>

  )
}

export default StaffInfor