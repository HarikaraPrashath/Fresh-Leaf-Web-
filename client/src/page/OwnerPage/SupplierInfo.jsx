import React, { useState, useEffect } from 'react';React;
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IoMdSearch } from 'react-icons/io';
import Footer from "../../component/Footer";
import Navbarl from "../../component/Navbarl";
import Logo from '../../assets/Logo.png';
import { FaFilePdf } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaFileExcel } from "react-icons/fa6"
import ExcelJS from 'exceljs'; // Ensure this package is installed
import FileSaver from 'file-saver'; // Ensure this package is installed

function SupplierInfo() {
  const [InProduct, setInProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/server/supplier/supplierGetall');
      setInProduct(response.data ? Object.values(response.data.data) : []);
      setSearchResults(response.data ? Object.values(response.data.data) : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/server/supplier/supplierDelete/${id}`)
      .then(res => {
        console.log(res);
        alert('Product details deleted successfully!');
        fetchProducts();
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = InProduct.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      product.Id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const downloadExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Supplier Information'); // Named worksheet
  
    // Define columns for the worksheet
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 15 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Quantity', key: 'quantity', width: 15 },
      { header: 'Net Weight (g)', key: 'netWeight', width: 20 },
      { header: 'Total Price (Rs.)', key: 'totalPrice', width: 20 },
    ];
  
    // Add data to the worksheet
    searchResults.forEach((product) => {
      worksheet.addRow({
        id: product.Id,
        name: product.name,
        quantity: product.qty,
        netWeight: product.netweight,
        totalPrice: product.totalprice,
      });
    });
  
    // Set download file name
    const fileName = 'supplier_information.xlsx';
  
    // Write the workbook to a buffer and trigger download
    workbook.xlsx.writeBuffer().then((buffer) => {
      FileSaver.saveAs(
        new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        fileName
      );
    });
  };
  const generateReportPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString(); // Get current date and time
    
    // company logo and name
    const imgData = Logo; 
    doc.addImage(imgData, 'JPEG', 10, 10, 45, 25); 
    doc.setFontSize(20);
    doc.text("FRESH LEAF:Since 1960", doc.internal.pageSize.width / 2, 55, { align: 'center' }); 
    
    // generated report time
    doc.setFontSize(10);
    doc.text(`Report generated on: ${currentDate}`, 10, 10);
    
    // table
    const tableColumn = ["ID", "Name", "Quantity", "Net Weight(g)", "Total Price(Rs.)"];
    const tableRows = searchResults.map(product => [
        product.Id,
        product.name,
        product.qty,
        product.netweight,
        product.totalprice
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 90 }); 
    
    // line for signature
    doc.line(10, 80, doc.internal.pageSize.width - 10, 80); 
    doc.setFontSize(12);
    doc.text("Signature: ____________________", 10, 70); 

    doc.save("product_details_report.pdf");
  };


  return (
    <div>
    <div>
      <Navbarl/>
      <div className='flex justify-between mt-4 px-14'>

      </div>
    </div>
    <div className='flex flex-row'>
        <div className="flex w-[300px] h-[1200px] bg-lime-900">
        <div className="p-5">
            <button className="w-[230px] h-[40px] rounded-2xl  bg-gray-200 text-center my-3">
              <Link to="/OwnerPage">User Infor</Link>
            </button>
            <button className="w-[230px] h-[40px]  bg-gray-500 text-white rounded-2xl text-center my-3">
              <Link to="/SupplierInfo">Supplier Infor</Link>
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
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/MarketingDetailsShowpage">Promotion Infor</Link>
            </button>
            <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
              <Link to="/">Payment Infor</Link>
            </button>
          </div>
      </div>
      <div className='w-[80%] flex-grow border'>
        <main className='overflow-y-auto px-10 py-20'>
          <div className="ml-[50px] relative">
            <label>
              <span className="sr-only">Search</span>
              <input
                className="placeholder-italic placeholder-text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <IoMdSearch className="fill-slate-300" />
              </span>
            </label>
          </div>
          <div className='flex justify-between mt-9 ml-9'>
            <button className='rounded-md p-2 cursor-pointer flex items-center justify-center bg-red-500 hover:bg-red-500' style={{ width: '50px', height: '30px' }} onClick={generateReportPDF}>
              <FaFilePdf size={16} />
            </button>
            <button className='rounded-md p-2 cursor-pointer flex items-center justify-center bg-red-500 hover:bg-red-500' style={{ width: '50px', height: '30px' }} onClick={downloadExcel}>
              <FaFileExcel size={16} />
            </button>
          </div>
          <div className="bg-white rounded p-3 ml-6">
            <table className="w-full border mt-5">
              <thead>
                <tr className="bg-gray-300 font-serif">
                  <th className="p-3 text-center">ID</th>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">NetWeight(g)</th>
                  <th className="p-3 text-center">Total Price(Rs.)</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((product, index) => (
                  <tr key={index}>
                    <td className="text-center">{product.Id}</td>
                    <td className="text-center">{product.name}</td>
                    <td className="text-center">{product.qty}</td>
                    <td className="text-center">{product.netweight}</td>
                    <td className="text-center">{product.totalprice}</td>
                    <td className="flex justify-center">
                      <button className="bg-red-500 text-white px-3 py-1 rounded text-center mr-2" onClick={() => handleDelete(product._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
    <Footer />
  </div>
  );
}

export default SupplierInfo;
