import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import backgroundImage from '../assets/heroIMG.jpg';
import blackTea from '../assets/blackTea.jpg';
import greenTea from '../assets/greenTea.jpg';
import oolongTea from '../assets/oolongTea.jpg';
import yellowTea from '../assets/yellowTea.jpg';
import categoriesBgUrl from '../assets/categoriesBgUrl.jpg';
import Overview from '../assets/Overview.jpg';
import expert from '../assets/expert.jpg';
import review from '../assets/review.jpg';
import partnership from '../assets/partnership.jpg';
import aboutus from '../assets/ABOUT_US.jpeg';

export default function About() {
  return (
    <div>
    <Navbar />

    <div className="relative w-full h-[700px] bg-cover" style={{ backgroundImage: `url(${aboutus})` }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className='text-6xl font-bold text-center'>About Us</h1>
      </div>
    </div>

    <div className='container mx-auto px-4 mt-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <img className='w-full h-auto' src={Overview} alt="Company Overview" />
        </div>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl font-bold mb-4'>Company Overview</h2>
          <p className='text-lg'>
            FreshLeaf specializes in selling and managing a diverse range of premium tea varieties, focusing on Oolong, black, green, and yellow teas.
            They cater to tea enthusiasts who value quality, flavor, and ethical sourcing.
            FreshLeaf's focus on quality, variety, and ethical sourcing positions them well to attract discerning tea lovers.
            Further insights into their specific offerings, management practices, and marketing strategies would allow for a more detailed evaluation.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl font-bold mb-4'>Expertise in Tea</h2>
          <p className='text-lg'>
            FreshLeaf appears to have the potential to offer a captivating and informative experience for tea enthusiasts,
            but could benefit from further details and specific examples to showcase its expertise.
            By implementing these suggestions, it can strengthen its online presence and establish itself as a trusted source for tea enthusiasts.
          </p>
        </div>
        <div>
          <img className='w-full h-auto' src={expert} alt="Expertise in Tea" />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
        <div>
          <img className='w-full h-auto' src={review} alt="Customer Satisfaction" />
        </div>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl font-bold mb-4'>Customer Satisfaction</h2>
          <p className='text-lg'>
            A customer recently had the pleasure of browsing the FreshLeaf website and learning about their diverse selection of tea leaves, including Oolong, Black, Green, and Yellow varieties.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
        <div className='flex flex-col justify-center'>
          <h2 className='text-3xl font-bold mb-4'>Partnerships</h2>
          <p className='text-lg'>
            FreshLeaf appears to have the potential to offer a captivating and informative experience for tea enthusiasts,
            but could benefit from further details and specific examples to showcase its expertise.
            By implementing these suggestions, it can strengthen its online presence and establish itself as a trusted source for tea enthusiasts.
          </p>
        </div>
        <div>
          <img className='w-full h-auto' src={partnership} alt="Partnerships" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
  );
}
