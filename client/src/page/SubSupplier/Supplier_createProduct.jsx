import React, { useState, useEffect } from 'react';React;
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbarl from "../../component/Navbarl";
import { useNavigate } from 'react-router-dom';

export default function SupplierCreateProduct() {
    const [Id, setID] = useState('');
    const [name, setName] = useState('');
    const [qty, setQty] = useState('');
    const [netweight, setWeight] = useState('');
    const [unitprice, setUnitprice] = useState('');
    const [totalprice, setTotalprice] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Function to calculate total price based on quantity and unit price
    const calculateTotalPrice = () => {
        const qtyValue = parseFloat(qty);
        const unitPriceValue = parseFloat(unitprice);
    
        if (!isNaN(qtyValue) && !isNaN(unitPriceValue)) {
            const totalPrice = qtyValue * unitPriceValue;
            setTotalprice(totalPrice.toFixed(2));
        } else {
            setTotalprice(''); // Set total price to empty string if either quantity or unit price is not a valid number
        }
    };
    
    useEffect(() => {
        calculateTotalPrice();
    }, [qty, unitprice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input before submitting
        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/server/supplier/supplierCreate', {
                Id,
                name,
                qty,
                netweight,
                unitprice,
                totalprice
            });

            if (response.status === 201) {
                console.log(response.data);
                alert('Product created successfully!');
                navigate('/productdetails');
            } else {
                throw new Error(response.statusText || 'Failed to create product');
            }
        } catch (error) {
            const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
            console.error('Error creating product:', errorMessage);
            alert('Failed to create product. Please try again.');
        }
    };

    // Validation function
    const validate = () => {
        let errors = {};
        let isValid = true;
      
        // Validation for ID
        if (!String(Id).trim()) {
            errors.Id = 'ID is required';
            isValid = false;
        } else if (isNaN(Id)) {
            errors.Id = 'ID must be a number';
            isValid = false;
        }
      
        // Validation for Name
        if (!name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }
      
        // Validation for Quantity
        if (!String(qty).trim()) {
            errors.qty = 'Quantity is required';
            isValid = false;
        } else if (isNaN(qty)) {
            errors.qty = 'Quantity must be a number';
            isValid = false;
        }
      
        // Validation for Net Weight
        if (!String(netweight).trim()) {
            errors.netweight = 'Net Weight is required';
            isValid = false;
        } else if (isNaN(netweight)) {
            errors.netweight = 'Net Weight must be a number';
            isValid = false;
        }
      
        // Validation for Unit Price
        if (!String(unitprice).trim()) {
            errors.unitprice = 'Unit Price is required';
            isValid = false;
        } else if (isNaN(unitprice)) {
            errors.unitprice = 'Unit Price must be a number';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <>
            <div>
                <Navbarl />
                <div className='flex justify-between mt-4 px-14'></div>
            </div>
            <div className="flex flex-row">
                <div className='w-[20%] h-[650px] flex-grow border'>
                    <div className='w-1/2 p-3 ml-[400px]'>
                        <div className='bg-gray-200 rounded-lg p-4'>
                            <form onSubmit={handleSubmit}>
                                <h2 className='text-2xl font-bold mb-4 font-serif text-center'>Add Product</h2>
                    
                                <div className='mb-2 font-serif'>
                                    <label htmlFor='ID'>ID</label>
                                    <input
                                        type='text'
                                        placeholder='Enter the Id'
                                        className='w-full p-2 border rounded'
                                        id='ID'
                                        name='ID'
                                        autoComplete='off'
                                        value={Id}
                                        onChange={(e) => { setID(e.target.value) }}
                                    />
                                    {errors.Id && <span className="text-red-500">{errors.Id}</span>}
                                </div>
                                <div className='mb-2 font-serif'>
                                    <label htmlFor='Name'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter the Name'
                                        className='w-full p-2 border rounded'
                                        id='Name'
                                        name='Name'
                                        autoComplete='off'
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                                </div>
                                <div className='mb-2 font-serif'>
                                    <label htmlFor='Quantity'>Quantity</label>
                                    <input
                                        type='text'
                                        placeholder='Enter the Quantity'
                                        className='w-full p-2 border rounded'
                                        id='Quantity'
                                        name='Quantity'
                                        autoComplete='off'
                                        value={qty}
                                        onChange={(e) => { setQty(e.target.value) }}
                                    />
                                    {errors.qty && <span className="text-red-500">{errors.qty}</span>}
                                </div>
                                <div className='mb-2 font-serif'>
                                    <label htmlFor='Brand'>NetWeight(g)</label>
                                    <input
                                        type='text'
                                        placeholder='Enter the Brand'
                                        className='w-full p-2 border rounded'
                                        id='Brand'
                                        name='Brand'
                                        autoComplete='off'
                                        value={netweight}
                                        onChange={(e) => { setWeight(e.target.value) }}
                                    />
                                    {errors.netweight && <span className="text-red-500">{errors.netweight}</span>}
                                </div>
                                <div className='mb-2 font-serif'>
                                    <label htmlFor='unitprice'>Unit Price(Rs)</label>
                                    <input
                                        type='text'
                                        placeholder='Enter the Unit Price'
                                        className='w-full p-2 border rounded'
                                        id='unitprice'
                                        name='unitprice'
                                        autoComplete='off'
                                        value={unitprice}
                                        onChange={(e) => { setUnitprice(e.target.value) }}
                                    />
                                    {errors.unitprice && <span className="text-red-500">{errors.unitprice}</span>}
                                </div>

                                <div className='mb-4 font-serif' style={{ marginTop: '1rem' }}>
                                    <label htmlFor='totalprice'>Total Price(Rs.)</label>
                                    <input
                                        type='text'
                                        className='w-full p-2 border rounded'
                                        id='totalprice'
                                        name='totalprice'
                                        value={totalprice}
                                        readOnly
                                    />
                                </div>
                                <div className='mb-2 font-serif'></div>
                                <div className='flex flex-row p-3 justify-between font-serif'>
                                    <Link to='/productdetails' className='rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950 w-[150px] h-8 text-center text-white ml-4'>Back</Link>
                                    <button type='submit' className='rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950 w-[150px] h-8 text-center text-white m-[30px]'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
