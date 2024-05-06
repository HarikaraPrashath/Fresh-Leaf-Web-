import React from 'react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='flex justify-between mt-4 px-14 '>
      <div>
        <img className='w-[120px] h-[48px] ' src={Logo} alt='Logo' />
      </div>
      <div>
        <ul className='flex gap-5'>
          <li className='hover:text-[#75d705] hover:border-solid cursor-pointer'>
            <Link to="/">Home</Link>
          </li>
          <li className='hover:text-[#75d705] hover:border-solid cursor-pointer'>
            <Link to="/about">About</Link>
          </li>
          <li className='hover:text-[#75d705] hover:border-solid cursor-pointer'>
            <Link to="/mainProducts">Product</Link>
          </li>
          <li className='hover:text-[#75d705] hover:border-solid cursor-pointer'>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div>
        <h1>
          <Link to={"/login"} className="bg-[#417702] text-white px-2 py-1 rounded-sm hover:opacity-95 cursor-pointer">LogIn</Link>
        </h1>
      </div>
    </div>
  );
}
