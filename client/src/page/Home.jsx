import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { Link } from 'react-router-dom';
import Footer from '../component/Footer'
import backgroundImage from '../assets/heroIMG.jpg'
import blackTea from '../assets/blackTea.jpg'
import greenTea from '../assets/greenTea.jpg'
import oolongTea from '../assets/oolongTea.jpg'
import blogPic from '../assets/blogPic.jpg'
import g1 from '../assets/g1.jpg'
import g2 from '../assets/g2.jpg'
import g3 from '../assets/g3.jpg'
import g4 from '../assets/g4.jpg'

import yellowTea from '../assets/yellowTea.jpg'
import { FaBoxArchive ,FaUser ,FaTruckFast ,FaMessage   } from "react-icons/fa6";
import CounterUp from 'react-countup'
import ScrollTigger  from 'react-scroll-trigger'
import teaLea from '../assets/tea.jpg'

export default function () {
    const [counterOn,setCounterOn]= useState(false);
  return (
    <div>
        <Navbar/>
        <div className="w-[1519px] h-[600px] bg-cover bg-gray-200 " style={{ backgroundImage:`url(${backgroundImage})`}}>
            <p className='text-white ml-16 text-6xl pt-16'>Exquisite tea,<br/>brewed perfection,<br/>for sale.</p>
            <h2 className='bg-[#457f03] rounded-lg text-2xl text-white w-32 text-center px- py-2 ml-16 mt-5 hover:opacity-90 cursor-pointer'>Explore</h2>
        </div>
        {/* this for icons */} 
        <div className=''>
           <h1 className='text-6xl p-5 text-center mt-10 my-3'>Our Network</h1>
           <div className=''>
           <div className=' w-[1400px] h-[200px] m-auto rounded-3xl '>
                <div className='flex gap-48 justify-center p-7 '>
                    <div>
                    <FaBoxArchive className=' text-[#457f03]  w-20 h-20'/>
                    <p className='text-center text-lg m-1'>Products</p>
                    </div>
                    <div>
                    <FaUser className='text-[#457f03] w-20 h-20'/>
                    <p className='text-center text-lg m-1'>Deliveries</p>
                    </div>
                    <div>
                    <FaTruckFast className='text-[#457f03] w-20 h-20' />
                    <p className='text-center text-lg m-1'>Users</p>
                    </div>
                    <div>
                    <FaMessage className='text-[#457f03] w-20 h-20'/>
                    <p className='text-center text-lg m-1'>Feedback</p>
                    </div>  
                </div>
                
                </div> 
                 {/* counting rise part */}
                 <div>
                    <ScrollTigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)} >
                        <h1 className='text-blac -mt-14 text-4xl ml-40  flex'>
                            <div className='ml-[150px]'>  {counterOn && <CounterUp start={0} end={99} duration={2} delay={0}/>}+</div>
                            <div className='ml-[221px]'>  {counterOn && <CounterUp start={0} end={80} duration={2} delay={0}/>}+</div>
                            <div className='ml-[215px]'>  {counterOn && <CounterUp start={0} end={79} duration={2} delay={0}/>}+</div>
                            <div className='ml-[210px]'>  {counterOn && <CounterUp start={0} end={94} duration={2} delay={0}/>}+</div>
                
                        </h1>
                    </ScrollTigger>

                 </div>
           
           </div>            
           </div>
         {/* product Listing block */}
         <h1 className='text-6xl text-center p-5  mt-12 mb-2'>Products</h1>
         <div className=' bg-gray-100 m-10 pt-10 h-[650px]'>
            <div className='flex '>
                <div className='flex bg-gray-200 rounded-3xl m-auto mb-6'>
                    <div className='flex-1 w-40 h-40'>
                        <img src={teaLea} alt="tea leaves" />
                    </div>
                    <div className='flex-2 px-3 py-4'>
                        <h1 className='font-bold text-start mb-2'>Black Tea leaves</h1>
                        <p className='text-center mb-2'>Bold, robust black tea with rich malty <br/>notes and invigorating.</p>
                        <h3 className='bg-green-700 text-white rounded-2xl w-24 text-center py-1 px-4 ml-16 cursor-pointer  hover:opacity-95'>Buy Now</h3>
                    </div>
                </div> 

                <div className='flex bg-gray-200 rounded-3xl m-auto mb-6'>
                    <div className='flex-1 w-40 h-40'>
                        <img src={teaLea} alt="tea leaves" />
                    </div>
                    <div className='flex-2 px-3 py-4'>
                        <h1 className='font-bold text-start mb-2'>Black Tea leaves</h1>
                        <p className='text-center mb-2'>Bold, robust black tea with rich malty <br/>notes and invigorating.</p>
                        <h3 className='bg-green-700 text-white rounded-2xl w-24 text-center py-1 px-4 ml-16 cursor-pointer hover:opacity-95'>Buy Now</h3>
                    </div>
                </div>
                
            </div>

            <div className='flex '>
                <div className='flex bg-gray-200 rounded-3xl m-auto mb-6'>
                    <div className='flex-1 w-40 h-40'>
                        <img src={teaLea} alt="tea leaves" />
                    </div>
                    <div className='flex-2 px-3 py-4'>
                        <h1 className='font-bold text-start mb-2'>Black Tea leaves</h1>
                        <p className='text-center mb-2'>Bold, robust black tea with rich malty <br/>notes and invigorating.</p>
                        <h3 className='bg-green-700 text-white rounded-2xl w-24 text-center py-1 px-4 ml-16 cursor-pointer hover:opacity-95'>Buy Now</h3>
                    </div>
                </div>

                <div className='flex bg-gray-200 rounded-3xl m-auto mb-6'>
                    <div className='flex-1 w-40 h-40'>
                        <img src={teaLea} alt="tea leaves" />
                    </div>
                    <div className='flex-2 px-3 py-4'>
                        <h1 className='font-bold text-start mb-2'>Black Tea leaves</h1>
                        <p className='text-center mb-2'>Bold, robust black tea with rich malty <br/>notes and invigorating.</p>
                        <h3 className='bg-green-700 text-white rounded-2xl w-24 text-center py-1 px-4 ml-16 cursor-pointer hover:opacity-95'>Buy Now</h3>
                    </div>
                </div>
                
            </div>

            <Link to={"/mainProducts"} className='bg-green-900 text-white rounded-2xl w-56 ml-[638px] py-1 px-4 cursor-pointer  mt-5 mb-5 m-auto hover:opacity-95' >Products We Have</Link>
        </div>

 
        {/* categories of tea postion */}
        <div className="w-[1519px] h-[500px] mt-10 py-5 bg">
            <h1 className='text-center text-black text-6xl mb-8'>Categories of tea</h1>
            
            <div className=' flex gap-20 px-5 pl-28  ml-[150px]'>
            <div> 
                <img className='w-44 h-44 rounded-full bg-cover ' src={blackTea} alt="black tea" /> 
                 <h3 className='text-black text-2xl text-center mt-5'>Black Tea</h3>
                 <p className='text-center text-black'>Black tea flavors.</p>
             </div>
            <div> 
                <img className='w-44 h-44 rounded-full bg-auto' src={greenTea} alt="black tea" /> 
                 <h3 className='text-black text-2xl text-center mt-5'>Green Tea</h3>
                 <p className='text-center text-black'> Green tea offers a crisp</p>
            </div>
            <div> 
                <img className='w-44 h-44 rounded-full bg-auto' src={oolongTea} alt="black tea" /> 
                 <h3 className='text-black text-2xl text-center mt-5'>Oolong Tea Tea</h3>
                 <p className='text-center text-black'>Distinctive oolong tea flavors</p>
            </div>
            <div> 
                <img className='w-44 h-44 rounded-full bg-cover' src={yellowTea} alt="black tea" /> 
                 <h3 className='text-black text-2xl textcenter mt-5'>Yellow Tea</h3>
                 <p className='text-center text-black'>Yellow tea offers a mellow </p>
            </div>
            </div>
        </div>
 
{/*    this is for blog section */}
        <div>
         

        </div>

        {/* About show block */}
        <div>
        <h1 className='text-6xl text-center my-3'>Blog</h1>
        <div>
            
            <div className=' bg-gray-100 m-10 rounded-lg h-[350px] p-2'>
                <img src={blogPic} alt="" className='w-32 h-32 rounded-full m-auto'/>
                <h1 className='text-center py-5'>The Tea Leaves Sales Management System is fantastic! It's simplified our sales process, making it smoother and more efficient. <br/>
                    I love how easy it is to track inventory and analyze sales data. <br/>
                    Plus, the customizable reporting feature is a game-changer for our business strategy. <br/>
                    Overall, it's been a huge help in boosting our productivity and improving customer satisfaction. <br/>
                    Great job to the team behind this system!</h1>
                  <button className='bg-green-600 hover:bg-green-950 text-white px-6 py-1 rounded-lg ml-[650px]'>Blog</button>
            </div>
        </div>

        </div>

        {/* gallery page */}
        <div className='my-5'>
        <h1 className='text-6xl text-center my-3'>Gallery</h1>
        <div className=' bg-gray-100 m-10 my-10 rounded-lg h-[450px] w-[1250px] p-2 flex justify-around m-auto px-10 py-2'>
        
        <div><img  className='w-full h-full ' src={g1} alt="" /></div>
        <div ><img src={g2} alt=""  className='w-full h-full' /></div>
        <div><img src={g3} alt=""  className='w-full h-full' /></div>
        <div><img src={g4} alt=""  className='w-full h-full' /></div>
        
        </div>
        <Link className='bg-green-600  hover:bg-green-950 text-white px-6 py-1 text-lg   rounded-lg ml-[630px]  my-5'>Here you can visit our Gallery</Link>
        </div>

        
        <Footer  />
  </div>
  );
}
