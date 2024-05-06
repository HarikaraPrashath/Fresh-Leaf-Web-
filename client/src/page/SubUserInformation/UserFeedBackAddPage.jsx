import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function UserFeedBackAddPage() {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [rating, setRating] = useState(0); // Initial rating set to 0
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/server/FeedBackUser/create",
                {
                    rating,
                    name,
                    des
                }
            );

            console.log(response);
            alert('Review added successfully!');
            navigate('/UserFeedBack');
        } catch (error) {
            console.error("Error creating UserDetails:", error);
            alert('Error adding review!');
        }
    };

    // Function to handle clicking on a star
    const handleStarClick = (value) => {
        setRating(value);
    };

    // Function to render stars based on the rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    className={`text-3xl w-14 h-20 ${i <= rating ? "text-yellow-500" : "text-gray-300"} w-[20px] h-[15px]`}
                    onClick={() => handleStarClick(i)}
                    type="button"
                >
                    ★
                </button>
            );
        }
        return stars;
    };
    



    return (
        <div className='bg-slate-200 rounded-lg py-7 w-[500px] h-[500px] mt-5 ml-[500px] p-7'>
        <Link to={"/UserFeedBack"} className="block mb-4">Back</Link>
        <h3 className="text-2xl font-bold mb-4">Add New Review</h3>
        <form className='addreviewForm' onSubmit={handleSubmit}>
        <div className="mb-4">
                <label className="text-xl mb-2 block  font-medium text-gray-700">Product Rating (?/5)</label>
                <div>{renderStars()}</div>
            </div>
            <div className="mb-4">
                <label htmlFor="productName" className="text-xl mb-2 block text-sm font-medium text-gray-700">Product Name</label>
                <select
                    id="productName"
                    name="productName"
                    onChange={(e) => {
                        const selectedProductName = e.target.value;
                        setName(selectedProductName);
                    }}
                    value={name}
                    autoComplete='off'
                    className='w-80 w-[400px] h-[40px] px-2 rounded-lg bg-white'
                >
                    <option value="">Select a product...</option>
                    <option value="Green Tea">Green Tea</option>
                    <option value="Yellow Tea">Yellow Tea</option>
                    <option value="Arabic Flavour">Arabic Flavour</option>
                    <option value="Black Tea">Black Tea</option>
                    <option value="Jamine Flavour">Jamine Flavour</option>
                    
                </select>
            </div>
            
            <div className="mb-4">
                <label htmlFor="descript" className="text-xl mb-2 block text-sm font-medium text-gray-700">Review</label>
                <input
                    type="text"
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                    id="descript"
                    name="descript"
                    autoComplete='off'
                    placeholder='Description'
                    className='w-80 w-[400px] h-[40px] px-2 rounded-lg bg-white'
                />
            </div>
            <div className="mb-4">
                <button type="submit" className='bg-green-600 mt-9 px-4 py-2 rounded-3xl text-white'>ADD Review</button>
            </div>
        </form>
    </div>
    )
}

export default UserFeedBackAddPage;
