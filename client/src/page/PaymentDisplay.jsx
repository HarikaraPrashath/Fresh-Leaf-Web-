import React, { useState, useEffect } from "react";React;
import { Link } from "react-router-dom";
import axios from 'axios';
import Footer from '../component/Footer'; 
import Navbarl from "../component/Navbarl";

export default function PaymentDisplay() {
    const [InPayment, setInPayment] = useState([]);

    useEffect(() => {
        fetchPayment();
    }, []);

    const fetchPayment = async () => {
        try {
            const response = await axios.get('http://localhost:3001/server/supplier/getAllPaymentDetails');
            setInPayment(response.data ? Object.values(response.data.data) : []);
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/server/supplier/DeletePaymentDetails/${id}`)
        .then(res => {
            console.log(res);
            alert('Payment details deleted successfully!');
            fetchPayment();
        })
        .catch(err => console.log(err));
    }

    const hideCardNumber = (cardNumber) => {
        const visibleDigits = cardNumber.slice(0, 4);
        const hiddenDigits = "X".repeat(cardNumber.length - 4);
        return `${visibleDigits}${hiddenDigits}`;
    }

    return (
        <>
            <div>
                <Navbarl />
                <div className='flex justify-between mt-4 px-14'></div>
            </div>
            <div className='flex flex-row'>
          <div className="flex w-[300px] h-[650px] bg-lime-900 ">
          <div className="p-5">
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3">
          <Link to="/supplierAccount">Profile</Link>
          </button>
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/productdetails">Product Details</Link></button>
          
          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/createproduct">Product History</Link></button>

          <button className="w-[230px] h-[40px] bg-gray-200 rounded-2xl text-center my-3"><Link to="/PaymentDisplay">Payment Details</Link></button>
            </div>
        </div>

                <div className="w-[80%] h-[650px] flex-grow border">
                <div className="w-[80%] p-3 ml-[130px]">
                        <div className="bg-gray-200 rounded-lg p-4">
                            <h2 className="text-2xl font-bold mb-4 font-serif text-center">Payment Details</h2>
                            <div className="bg-white rounded p-3 ml-6 ">
                                <div className='flex flex-row justify-center font-serif text-center'>
                                    <Link to='/paymentdetails' className='bg-slate-300 rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] active:bg-slate-500
                                        w-[300px] h-8 flex items-center justify-center font-serif ml-9'>Create New Payment Detail</Link>
                                </div>
                                <table className="w-full border mt-5">
                                    <thead>
                                        <tr className="bg-gray-300 font-serif">
                                            <th className="p-3 text-center">Card Holder Name</th>
                                            <th className="p-3 text-center">Name of Bank</th>
                                            <th className="p-3 text-center">Card Number</th>
                                            <th className="p-3 text-center">Bank Branch</th>
                                            <th className="p-3 text-left">Action</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {InPayment.map((payment, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{payment.Card_Holder_Name}</td>
                                                <td className="text-center">{payment.Name_of_Bank}</td>
                                                <td className="text-center">{hideCardNumber(payment.Card_Number)}</td>
                                                <td className="text-center">{payment.Branch}</td>
                                                <td className="flex text-center ">
                                                    <Link to={`/PaymentUpdate/${payment._id}`} className="bg-green-950 text-white px-3 py-1 rounded text-center mr-2">Update</Link>
                                                    <button className="bg-red-500 text-white px-3 py-1 rounded text-center mr-2" onClick={() => handleDelete(payment._id)}>Delete</button>
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
            <Footer />
        </>
    );
}
