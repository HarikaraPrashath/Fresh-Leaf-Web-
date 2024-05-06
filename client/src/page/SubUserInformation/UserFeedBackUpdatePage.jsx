import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UserFeedBackUpdatePage() {
  const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [rating, setRating] = useState(0); // Initial rating set to 0
    
    useEffect(() => {
      axios
          .get(`http://localhost:3001/server/FeedBackUser/getone/${id}`)
          .then((result) => {
              console.log("vfdfdfdf", result);
              setRating(result.data.data.rating);
              setName(result.data.data.name);
              setDes(result.data.data.des);
          })
          .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
      e.preventDefault();
      axios
          .put(`http://localhost:3001/server/FeedBackUser/update/${id}`, {
              rating,
              name,
              des,
          })
          .then((result) => {
              console.log(result);
              alert('Review updated successfully!');
              navigate('/UserFeedBack');
          });
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
                  className={`text-3xl w-14 h-15 ${i <= rating ? "text-yellow-500" : "text-gray-300"} w-[20px] h-[15px]`}
                  onClick={() => handleStarClick(i)}
                  type="button" // Add type="button" to prevent form submission
              >
                  ★
              </button>
          );
      }
      return stars;
  };

  return (
    <div className='bg-slate-200 rounded-lg py-7 w-[500px] h-[500px] ml-[500px] p-7'>
            <Link to={"/UserFeedBack"} className="text-blue-500">Back</Link>
            <h3 className="text-2xl font-bold mb-4">Updating Reviews</h3>
            <form className='addreviewForm' onSubmit={handleUpdate}>
                <div className="inputGroup">
                    <label htmlFor="rating" className="text-xl mb-2 block text-sm font-medium text-gray-700">Rating (?/5)</label>
                    <div>{renderStars()}</div>
                </div>
                <div className="inputGroup">
                    <label htmlFor="productName" className="text-xl mb-2 block text-sm font-medium text-gray-700">Product Name</label>
                    <select
                        id="productName"
                        name="productName"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className='w-80 w-[400px] h-[40px] px-2 rounded-lg bg-white'
                    >
                        <option value="">Select a product...</option>
                        <option value="Green Tea">Green Tea</option>
                        <option value="Yellow Tea">Yellow Tea</option>
                        <option value="Arabic Flavour">Arabic Flavour</option>
                        <option value="Black Tea">Black Tea</option>
                        <option value="Jamine Flavour">Jamine Flavour</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="inputGroup">
                    <label htmlFor="des" className='text-xl mt-2 block text-sm font-medium text-gray-700'>Review</label>
                    <input type="text" value={des} onChange={(e) => setDes(e.target.value)} id="des" name="des" autoComplete='off' className='w-80 w-[400px] h-[40px] px-2 rounded-lg' placeholder='Review' />
                </div>
                <div className="inputGroup">
                    <button type="submit" className='bg-green-600 mt-9 px-4 py-2 rounded-3xl text-white'>UPDATE REVIEW</button>
                </div>
            </form>
        </div>
  )
}

export default UserFeedBackUpdatePage