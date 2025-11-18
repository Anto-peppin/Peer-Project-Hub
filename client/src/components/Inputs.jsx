import React from 'react'
import { NavLink } from 'react-router-dom'
import Aside from './Aside'
import { FaUser } from "react-icons/fa";

const Inputs = () => {



  return (
    <>
    <div className='sticky top-0 z-20 bg-[#141a27]'>
    <div className='flex gap-1 items-center p-2 sticky md:hidden'>
                <img src="/logo.png" className='w-6 ' loading="lazy" alt="logo"/>
                <h2 className='font-bold text-xl text-orange-500 whitespace-nowrap '>Peer Project Hub</h2>
            </div>
    <div className='w-full p-2 bg-[#141a27] text-white shadow-sm shadow-white flex items-center justify-between sticky left-0  z-10'>
       <div className='flex items-center gap-3'>
         <NavLink to={'allproject'} className={({isActive})=>`  ${isActive?'border-b-2 animate-pulse':'border-0'}  pb-0.5 border-b-orange-500 cursor-pointer `}>All projects</NavLink>
        <NavLink to={'mostliked'} className={({isActive})=>` ${isActive?' border-b-2 animate-pulse':'border-0'} pb-0.5 border-b-orange-500 cursor-pointer `} >Most liked projects</NavLink>
       </div>
    

<div className="drawer max-w-fit">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content inline-block">
   
    <label htmlFor="my-drawer-1" className="tooltip tooltip-bottom md:hidden cursor-pointer" data-tip="user"><FaUser className='border rounded-full p-1  text-2xl' /></label>

  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay "></label>
  
       <Aside data={'show'}/>
      
       
  </div>
</div>



    </div>
    </div>
    </>

  )
}

export default Inputs