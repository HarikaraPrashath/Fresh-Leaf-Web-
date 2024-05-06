import React from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import Footer from '../component/Footer'

export default function OwnerDashboard() {
  return (
    <>
    {/* header code */}
    <div className='flex justify-between pr-5 pb-5 mt-4 px-14 w-[1200px] '>
    <div><img  className='w-[120px] h-[62px] ' src={Logo} alt='Logo'/></div>
    <div>
        <ul className='flex gap-6'>
          <li className='hover:text-[#b4df83] hover:border-solid cursor-pointer text-2xl font-serif'>Owner Dashboard</li>
        </ul>
    </div>
    <div><h1 className='Navbart_btn'>Login</h1></div>
    </div>
  <hr/>
      {/*** l***/}
    <div className='flex pt-4'>
        <div className='bg-lime-950 w-[200px] h-[500px] text-center rounded-tr-2xl rounded-bl-2xl mx-4'>
            <Link value="staff_payment" className='btn'>Staff payment </Link>
            <Link value = "supplier info" className='btn'> Supplier info</Link>
            <Link to='/Inventry_info' className='btn'>Inventry info</Link>
            <Link value ='staff info'className=' btn'>Staff inform</Link>
            <Link value= 'shipment info'className='btn'>Shipment info</Link>
            <Link value = 'member info'className='btn'>Member info</Link>
            <Link value = 'payment info'className='btn'>Payment info</Link>
            <Link value = 'feedback info'className='btn'>Feedback info</Link>

        </div>
        <div className=' w-[900px] pr-4 pl-4\3 h-[500px] flex'>
            <div className='mr-4 pr-4 '>
                <div className='bg-lime-200 w-[1000px] h-[250px] flex-grow text-center rounded-r-lg'>
                  <hi className='text-black text-2xl font-serif'>INVENTRY DETAILS</hi>
                </div> 
                <div className='bg-emerald-200 h-[250px] flex-grow text-center rounded-r-lg'>
                  <hi className='text-black text-2xl font-serif'>NOTIFICATION</hi>
                </div>
            </div>
        </div>    
    </div>
    <br/>
    <div className='w-[1300px]'>
    <Footer/>
    </div>
   
</>  )
}
