import React from 'react'
import { GoArchive } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import Footer from '../../component/Footer';
import Navbar from '../../component/Navbar';

export default function InventryAnalytics() {
    const data = [
        {
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ];
    
    
    return (
        <div>
       <Navbar/>
       <div className=' flex flex-row ' >
       <div className="flex w-[300px] h-[1200px] bg-lime-900">
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
              <Link to="/inventryCalculation">Caluculate</Link>
            </button>
            
          </div>
        </div>
        {/* stock details */}
           <div className='w-[20%] h-auto flex-grow border rounded-br-2xl rounded-tl-2xl mx-3 '>
               <main className='main-cards pl-[200px] pb-4'>
                   <div className='card ml-[70px] mt-4'>
                       <div className='card-inner'>
                           <h3 className='font-serif'>Products</h3>
                           <GoArchive className='card_icon'/>
                       </div>
                           <h1>300</h1>
                   </div>
                   <div className='card ml-[150px] mt-4'>
                       <div className='card-inner'>
                           <h3 className='font-serif'>CATEGORIES</h3>
                           <TbCategory className='card_icon'/>
                       </div>
                       <h1>12</h1>
                   </div>
                   </main>
                   
               <div className='charts'>
                   {/* bar chart */}
       
               <ResponsiveContainer width="80%" height="80%">
                     <BarChart
                       width={500}
                       height={300}
                       data={data}
                       margin={{
                         top: 5,
                         right: 30,
                         left: 20,
                         bottom: 5,
                       }}
                     >
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="name" />
                       <YAxis />
                       <Tooltip />
                       <Legend />
                       <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                       <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                   </BarChart>
               </ResponsiveContainer>
                         {/* pie chart */}
               <ResponsiveContainer width="80%" height="80%">
                     <LineChart
                       width={500}
                       height={300}
                       data={data}
                       margin={{
                         top: 5,
                         right: 30,
                         left: 20,
                         bottom: 5,
                       }}
                     >
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="name" />
                       <YAxis />
                       <Tooltip />
                       <Legend />
                       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                     </LineChart>
               </ResponsiveContainer>
           </div>
           </div>        
           
       </div>
       <br/>
       <div>
         <Footer/>
       </div>
   </div>  )
}
