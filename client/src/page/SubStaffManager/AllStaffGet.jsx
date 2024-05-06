import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { jsPDF } from 'jspdf'; 
import 'jspdf-autotable';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import Navbar from '../../component/Navbarl';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RxUpdate } from "react-icons/rx";


function AllStaffGet() {
  const [userProfile, setUserProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
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

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Generate a simple table with headers and data
    doc.autoTable({
      head: [['Name', 'Email', 'Gender', 'Experience', 'Batch']],
      body: filteredUserProfiles.map((profile) => [
        profile.name,
        profile.email,
        profile.gender,
        profile.experience,
        profile.batch,
      ]),
    });

    // Save and download the PDF
    doc.save('staff_data.pdf');
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
              <Link to="/StaffManagerAccountShowDetails">StaffManagerAccount</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/PaymentInforStaffMan">Payment Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/Responce">Responce</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/AllStaffGet">Staff Infor</Link>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center text-3xl">Staff Details</h1>
          <div>
            <Link to={`/AllStaffCreate`} className="px-8 bg-green-900  py-2 rounded-xl ml-5  text-white mx-2 ">
              Create
            </Link>

           <div className='ml-20 mt-16'>
           <div className="flex justify-between items-center my-4">
                <div className="w-1/2">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                  <div className="flex space-x-4">
                    {/* Download Buttons */}
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      onClick={downloadExcel}
                    >
                      Download Excel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      onClick={downloadPDF}
                    >
                      Download PDF
                    </button>
                  </div>
          </div>
           </div>
            <div className="w-full bg-white rounded p-4">
               <div className="w-[1150px] p-6 bg-white rounded-lg shadow-lg">
      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 border-b-2">Name</th>
            <th className="px-6 py-3 border-b-2">Email</th>
            <th className="px-6 py-3 border-b-2">Gender</th>
            <th className="px-6 py-3 border-b-2">Experience</th>
            <th className="px-6 py-3 border-b-2">Batch</th>
            <th className="px-6 py-3 border-b-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserProfiles.map((profile, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition duration-200"
            >
              <td className="px-6 py-3 border-b">{profile.name}</td>
              <td className="px-6 py-3 border-b">{profile.email}</td>
              <td className="px-6 py-3 border-b">{profile.gender}</td>
              <td className="px-6 py-3 border-b">{profile.exprience}</td>
              <td className="px-6 py-3 border-b">{profile.batch}</td>
              <td className="px-6 py-3 border-b text-center flex justify-center space-x-4">
                <Link
                  to={`/AllStaffUpdatePage/${profile._id}`}
                  className="px-3 py-2 bg-yellow-600 rounded-lg text-white hover:bg-yellow-700 transition"
                >
                  <RxUpdate className="mr-1" /> Update
                </Link>
                <button
                  className="px-3 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition"
                  onClick={() => handleDelete(profile._id)}
                >
                  <RiDeleteBin6Line className="mr-1" /> Delete
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
    </div>
  );
}

export default AllStaffGet;
