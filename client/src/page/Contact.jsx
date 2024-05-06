import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Contact from '../assets/contactus.jpg';


export default function About() {
  return (
    <div>
      <Navbar />

      <div className="w-[1519px] h-[700px] bg-cover" style={{ backgroundImage: `url(${Contact})` }}>
        <p className='text-white font-bold text-center ml-10 text-8xl pt-60'>Contact us</p>
      </div>
        <div>
            <div><h1 className='text-4xl text-center mt-5 mb-20'>Let's Start a Conversation</h1></div>
            <div className='flex px-10'>
                <div className='ml-20 w-[1500px]'>
                    <h1 className='text-2xl mb-3 font-bold'>Ask how we can help you: </h1>
                    <h6 className='text-xl mb-1'>See our plain in action</h6>
                    <p className='text-sm mb-6'>Your can follow our planing on facebook and instagram social media </p>

                    <h6 className='text-xl mb-1'>Master performance marketing</h6>
                    <p className='text-sm mb-6'>Mastering performance marketing for tea leaves<br/>involves strategic branding,digital presence, analytics, and effective<br/>sales management for sustained growth. </p>

                    <h6 className='text-xl mb-1'>Explore the life at Freshleaf</h6>
                    <p className='text-sm mb-9'>Your can follow our planing on facebook and instagram social media </p>



                    <h1 className='text-2xl mb-3 font-bold'>Point of contact </h1>
                    <h6 className='text-xl mb-1'>Colombo</h6>
                    <p className='text-sm mb-6'>11/50, <br/>Galle road, <br/>Wellawatta</p>

                    <h6 className='text-xl mb-1'>Kandy</h6>
                    <p className='text-sm mb-6'>2/102, <br/>Colombo road, <br/>Kandy</p>

                    <h6 className='text-xl mb-1'>Billing Inquiries</h6>
                    <p className='text-sm mb-6'>055-2223904</p>

                    <h6 className='text-xl mb-1'> Information and Sale</h6>
                    <p className='text-sm mb-6 text-blue-900'>@salesfresh@gmail.com</p>

                    <h6 className='text-xl mb-1'>Support</h6>
                    <p className='text-sm mb-6 text-blue-900'>@salesfresh@gmail.com</p>

                    <h6 className='text-xl mb-1'>Verification of Employeee</h6>
                    <p className='text-sm mb-6 text-blue-900'>@veri@gmail.com</p>
                </div>
                <div className='ml-40'>
                <h1 className='text-2xl mb-3 pl-32'>All fields are required</h1>

                <form>
                <input type="text" 
                 placeholder="First name"
                 className='w-[600px] p-2 border rounded mb-10'
                />

                <input type="text" 
                 placeholder="Last Name"
                 className='w-[600px] p-2 border rounded mb-10'
                />

                
                <input type="text" 
                 placeholder="Email address"
                 className='w-[600px] p-2 border rounded mb-10'
                />

                <input type="text" 
                 placeholder="Country"
                 className='w-[600px] p-2 border rounded mb-10'
                />


                <input type="text" 
                 placeholder="Comments"
                 className='w-[600px] p-2 border rounded mb-10'
                />

                <h3 className='bg-green-700 text-white rounded-2xl w-80 text-center py-1 px-4 ml-16 cursor-pointer hover:opacity-95'>Post </h3>
                </form>

                </div>
            </div>
        </div>
    </div>
  );
}
