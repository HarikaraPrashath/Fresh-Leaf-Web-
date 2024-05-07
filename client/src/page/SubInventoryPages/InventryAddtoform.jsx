import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaFilePdf } from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Navbar from "../../component/Navbar";
import axios from "axios";
import Footer from "../../component/Footer";

export default function InventryAddtoform() {
  const [InProduct, setInProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [lowStockAlerts, setLowStockAlerts] = useState([]); // Low stock alerts

  const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/server/inventoryapi/inventoryDelete/${id}`)
          .then(res => {
              console.log(res);
              alert('Inventory details deleted successfully!');
              window.location.reload();
          })
          .catch(err => console.log(err));
  };

  useEffect(() => {
      axios
          .get("http://localhost:3001/server/inventoryapi/inventoryGetAll")
          .then((result) => {
              console.log("data: ", typeof result.data.data); // Check the fetched data
              console.log("data: ", Object.values(result.data.data)); // Check the fetched data
              const products = result.data ? Object.values(result.data.data) : [];
              setInProduct(products);

              // Check for low stock items
              const lowStockItems = products.filter(product => parseInt(product.qty) < product.lowStockThreshold);
              setLowStockAlerts(lowStockItems);
          })
          .catch((err) => console.error(err)); // Log any errors
  }, []);

  // Search part
  const filtredInProduct = InProduct.filter((InventoryProduct) =>
      InventoryProduct.pcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      InventoryProduct.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // report generatePath

  const generateReportPDF = () => {
      const doc = new jsPDF();
      const imgData = Logo; 
      doc.addImage(imgData, 'JPEG', 150, 10, 45, 25); 
      doc.setFontSize(20);
      doc.setFont("serif");
      doc.text("FRESH LEAF:Since 1960 ", doc.internal.pageSize.width / 2, 45, { align: 'center' }); 
      
      doc.setFontSize(10);
      const tableColumn = ["ID", "Name", "Qty", "Reorder", "Unite Price", "Description",""];
      const tableRows = filtredInProduct.map(product => [
        product.pcode,
        product.name,
        product.qty,
        product.reorder,
        product.price,
        product.des,
      ]);
    
      
      // Auto-table generation
      const startY = 80; // Adjust this value to move the table downwards
      doc.autoTable(tableColumn, tableRows, { startY: startY }); // Add margin-top to move the table downwards
      
      const fixedDate = new Date().toLocaleString(); // Current date and time
      doc.text(`Date: ${fixedDate}`, 10, 10,{align:'left'},startY + 20); // Adjust coordinates as needed
      
      // Line for signature
      doc.line(5, startY - 8, doc.internal.pageSize.width - 25, startY - 8); 
      doc.setFontSize(12);
      doc.text("Signature: ____", 10, startY-20); 
    
      doc.save("Invenoty Stock roduct Details.pdf");
    };

  const itemCountMap = {};
  InProduct.forEach((request) => {
      if (request.name) {
          const itemName = request.name.toLowerCase();
          itemCountMap[itemName] = (itemCountMap[itemName] || 0) + 1;
      }
  });

  const filteredRequests = InProduct.filter((v) => v.name && v.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const itemCount = filteredRequests.length;
  const totalItemCount = InProduct.length;
   

  return (
    <div>
    <Navbar />
    <div className="flex flex-row font-serif">
        <div className="flex w-[280px] h-[900px] bg-lime-900">
            <div className="p-5">
                <button className="w-[230px] h-[40px] bg-gray-500 text-white rounded-2xl text-center my-3">
                    <Link to="/inventryProfile">Profile</Link>
                </button>
                <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                    <Link to="/inventroyAddtoForms">Add Form</Link>
                </button>
                <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                    <Link to="/inventryAnalytics">Analytics</Link>
                </button>
                <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                    <Link to="/inventryCalculation">Calculate</Link>
                </button>
                <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
                    <Link to="/OwnerPage">Home Page</Link>
                </button>
            </div>
        </div>
        <div className="w-[20%] h-[900px] flex-grow border rounded-b">
            <main className="main-container">
                <div className="">
                    <button className="btn-report bg-red-700 text-white p-2 w-[80px] pl-8 ml-[1000px] items-center justify-center rounded-sm" onClick={generateReportPDF}><FaFilePdf /></button>
                    <h3 className="text-3xl text-center mt-6">Inventory Product list</h3>
                    <hr />
                </div>
            </main>
            <div className="w-[300px] ml-[50px]">
                <label className="mt-3">
                    <span class="sr-only">Search</span>
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg class="fill-slate-300" viewBox="0 0 20 20"></svg>
                    </span>
                    <input
                        class="search"
                        placeholder="Search for anything..."
                        type="text"
                        name="search"
                        className="w-56 h-8 px-4 py-1 mt-3 border-x-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
            </div>
            <div className="bg-white rounded p-3 ">
                <div className="flex justify-end">
                    <Link to="/inventryCreateForm" className="ml-[746px] bg-slate-500 text-white px-3 py-3 rounded-2xl btn m-[30px] flex"><IoMdAddCircleOutline className="w-10 h-5" /> Add Product</Link>
                </div>
                <div className="tableContainer">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Product_Id</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Qty</th>
                                <th className="border border-gray-300 px-4 py-2">Reorder</th>
                                <th className="border border-gray-300 px-4 py-2">Unit Price<br/>(LKR)</th>
                                <th className="border border-gray-300 px-4 py-2">Description</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtredInProduct.map((product, index) => (
                                <tr key={index} className="bg-white">
                                    <td className={`border border-gray-300 px-4 py-2 text-center`}>{product.pcode}</td>
                                    <td className={`border border-gray-300 px-4 py-2 text-center `}>{product.name}</td>
                                    <td className={`border border-gray-300 px-4 py-2 text-center`}>{product.qty}</td>
                                    <td className={`border border-gray-300 px-4 py-2 text-center`}>{product.reorder}</td>
                                    <td className={`border border-gray-300 px-4 py-2 text-center`}>{product.price}</td>
                                    <td className={`border border-gray-300 px-4 py-2 text-center`}>{product.des}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                        <Link to={`/inventryUpdateform/${product._id}`} className="btn-update bg-blue-500 text-white px-3 py-1 rounded"><MdModeEditOutline /></Link>
                                        <button className="btn-delete bg-red-500 text-white px-3 py-1 rounded" onClick={(e) => handleDelete(product._id)}><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        <div className="flex flex-row">
                            <div className=" bg mt-4 mb-8">
                                <p >Total Items: {totalItemCount}</p>
                                {/* <p>Total Items Matching "{searchTerm}": {itemCount}</p> */}
                            </div>

                            <div>
                                {/* label la cheak panni pakka  */}
                            {/* <div className="text-center font-bold mt-4 mb-8">
                                {Object.entries(itemCountMap).map(([itemName, count]) => (
                                    count < 2 && <p key={itemName}>"{itemName}" is low stock</p>
                                ))}
                            </div> */}
                            </div>

                            {filtredInProduct.some(product => parseInt(product.qty) < parseInt(product.reorder)) && (
                            <div className=" mt-[60px] mb-8 pl-[800px] ">
                                <p className="text-lg h-[60px] bg-red-400 rounded-lg p-4 text-white border-black">Low Stock Alert: {filtredInProduct.filter(product => parseInt(product.qty) < parseInt(product.reorder)).map(product => product.pcode).join(",")} have low stock!</p>
                            </div>
                            )}
                        </div>
                </div>
                
                {/* Low stock alerts */}
                {/* <div className="mt-4 text-center">
                    {lowStockAlerts.length > 0 &&
                        <p className="text-lg text-red-500">Low Stock Alert: {lowStockAlerts.map(item => item.pcode).join(", ")}</p>
                    }
                </div> */}
            </div>
        </div>
    </div>
    <br />
    <div>
        <Footer />
    </div>
</div>
)
}
