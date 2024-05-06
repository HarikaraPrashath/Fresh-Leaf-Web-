import React, { useState, useEffect } from 'react';React;
import axios from 'axios';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Footer from '../component/Footer';
import Navbarl from "../component/Navbarl";

const ProductDetails = () => {
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

    const generateReportPDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleString(); // Get current date and time
        
        // company logo and name
        const imgData = Logo; 
        doc.addImage(imgData, 'JPEG', 150, 10, 45, 25); 
        doc.setFont("times"); //serif
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
        doc.text("Signature: ________________", 10, 70); 
    
        doc.save("product_details_report.pdf");
    };

    return (
        <>
            <div>
                <Navbarl />
                <div className='flex justify-between mt-4 px-14'></div>
            </div>

            <div className='flex flex-row'>
          <div className="flex w-[300px] h-[700px] bg-lime-900 ">
          <div className="p-5">
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
          <Link to="/supplierAccount">Profile</Link>
          </button>
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/productdetails">Product Details</Link></button>
          
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/createproduct">Product History</Link></button>

          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/PaymentDisplay">Payment Details</Link></button>
            </div>
        </div>

                <div className='w-[80%] flex-grow border'>
                    <main className='overflow-y-auto p-10'>
                        <div className="relative">
                            <input
                                className="placeholder-italic placeholder-text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                placeholder="Search for anything..."
                                type="text"
                                name="search"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <IoMdSearch />
                            </span>
                        </div>
                        <div className="mt-6">
                            <Link to='/createproduct' className="bg-green-950 text-white rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] active:bg-slate-500
                                w-[150px] h-8 flex items-center justify-center font-serif ml-4">Add Product</Link>
                        </div>
                        <div className="bg-white rounded p-3 mt-6">
                            <table className="w-full border">
                                <thead>
                                    <tr className="bg-gray-300">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Quantity</th>
                                        <th className="p-3">NetWeight(g)</th>
                                        <th className="p-3">Total Price(Rs.)</th>
                                        <th className="p-3 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((product, index) => (
                                        <tr key={index}>
                                            <td className="p-3">{product.Id}</td>
                                            <td className="p-3">{product.name}</td>
                                            <td className="p-3">{product.qty}</td>
                                            <td className="p-3">{product.netweight}</td>
                                            <td className="p-3">{product.totalprice}</td>
                                            <td className="p-3 flex">
                                                <Link to={`/updateproduct/${product._id}`} className="bg-green-950 text-white rounded-md p-2 m-1 cursor-pointer hover:scale-[1.1] active:bg-slate-500 w-[150px] h-8 flex items-center justify-center font-serif ml-4">Update</Link>
                                                <button className="bg-red-500 text-white rounded-md p-2 m-1 cursor-pointer hover:scale-[1.1] active:bg-slate-500 w-[150px] h-8 flex items-center justify-center font-serif ml-4 btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-6 flex justify-between'>
                            <button className='bg-green-950 text-white rounded-md p-2 m-1 cursor-pointer hover:scale-[1.1] active:bg-slate-500 w-[150px] h-8 text-center font-serif ml-4' onClick={generateReportPDF}>Generate Report PDF</button>
                            <Link to='/CalculateTotalPrice' className='bg-green-950 text-white rounded-md p-2 m-1 cursor-pointer hover:scale-[1.1] active:bg-slate-500 w-[150px] h-8 text-center font-serif ml-4'>Calculator</Link>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
