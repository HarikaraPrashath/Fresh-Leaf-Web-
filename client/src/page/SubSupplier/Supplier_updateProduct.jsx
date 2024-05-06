import React, { useEffect, useState } from "react";React;
import axios from "axios";
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import Navbarl from "../../component/Navbarl";

export default function Supplier_updateProduct() {
  const { id } = useParams(); 

  const [Id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [netweight, setWeight] = useState('');
  const [unitprice, setUnitprice] = useState(""); 
  const [totalprice, setTotalprice] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/server/supplier/supplierGetone/${id}`)
      .then((result) => {
        setId(result.data.data.Id);
        setName(result.data.data.name);
        setQty(result.data.data.qty);
        setUnitprice(result.data.data.unitprice);
        setTotalprice(result.data.data.totalprice);
        setWeight(result.data.data.netweight);
        
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Function to calculate total price based on quantity and unit price
  const calculateTotalPrice = () => {
    const totalPrice = parseFloat(qty) * parseFloat(unitprice);
    setTotalprice(totalPrice.toFixed(2)); // Ensure total price is formatted as currency with 2 decimal places
  };

  // Update total price whenever quantity or unit price changes
  useEffect(() => {
    calculateTotalPrice();
  }, [qty, unitprice]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate input before submitting
    if (!validate()) {
        return;
    }

    axios
      .put(`http://localhost:3001/server/supplier/supplierUpdate/${id}`, {
        Id,
        name,
        qty,
        netweight,
        unitprice,
        totalprice,
      })
      .then((result) => {
        console.log(result);
        alert("Product details successfully updated");
        navigate('/productdetails');
      })
      .catch((error) => {
        console.error('Product not updated:', error);
    });
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
      <div className='flex justify-between mt-4 px-14'>
      </div>
    </div>
    <div className="flex flex-row">
      <div className="w-[20%] h-[650px] flex-grow border pl-[100px]">
        <div className="w-1/2 p-3 ml-[300px]">
          <div className="bg-gray-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4 font-serif text-center">
              Update Product
            </h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-2 font-serif">
                <label htmlFor="ID">ID</label>
                <input
                  type="text"
                  placeholder="Enter the Id"
                  className="w-full p-2 border rounded"
                  name="ID"
                  value={Id}
                  onChange={(e) => setId(e.target.value)}
                />
                {errors.Id && <span className="text-red-500">{errors.Id}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  placeholder="Enter the Name"
                  className="w-full p-2 border rounded"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Quantity">Quantity</label>
                <input
                  type="text"
                  placeholder="Enter the Quantity"
                  className="w-full p-2 border rounded"
                  name="Quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                {errors.qty && <span className="text-red-500">{errors.qty}</span>}
              </div>
              <div className="mb-2 font-serif">
                <label htmlFor="Quantity">Netweight</label>
                <input
                  type="text"
                  placeholder="Enter the Quantity"
                  className="w-full p-2 border rounded"
                  name="weight"
                  value={netweight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                {errors.netweight && <span className="text-red-500">{errors.netweight}</span>}
              </div>
              <div className='mb-2 font-serif'>
                <label htmlFor='unitprice'>Unit Price(Rs.)</label>
                <input
                  type='text'
                  placeholder='Enter the Unit Price'
                  className='w-full p-2 border rounded'
                  name='unitprice'
                  value={unitprice}
                  onChange={(e) => setUnitprice(e.target.value)}
                />
                {errors.unitprice && <span className="text-red-500">{errors.unitprice}</span>}
              </div>
              <div className='mb-2 font-serif'>
                <label htmlFor='totalprice'>Total Price(Rs.)</label>
                <input
                  type='text'
                  placeholder='totalprice'
                  className='w-full p-2 border rounded'
                  name='totalprice'
                  value={totalprice}
                  onChange={(e) => setTotalprice(e.target.value)}
                  readOnly
                />
              </div>
              <div className="flex flex-row justify-center font-serif text-center">
                <button className="rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950 w-[150px] h-8 text-center text-white m-[30px]">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
