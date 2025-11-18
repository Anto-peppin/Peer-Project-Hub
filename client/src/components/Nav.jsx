import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Aside from './Aside';
const Nav = () => {
  return (
    <div className='w-full h-fit p-2 py-3 sticky top-0 flex justify-center z-50 bg-white '>
        <nav className='w-[95%] sm:w-[94%] flex justify-between items-center gap-x-4 gap-y-2 border flex-wrap sm:flex-nowrap '>
            <div className='flex gap-1 items-center order-1'>
                <img src="./logo.png" className='w-9 ' alt=""/>
                <h2 className='font-bold text-2xl md:text-3xl text-orange-500 whitespace-nowrap '>Peer Project Hub</h2>
            </div>
            <div className='grow border border-block rounded-2xl flex gap-1 items-center px-2 order-3 sm:order-2 '>
                <input type="text" className='grow border-0 outline-0 text-xl px-0.5 py-1' placeholder='Search the project' />
                <FaSearch />
            </div>
            <div className='flex gap-2 order-2 sm:order-3'>


                <div className="tooltip  tooltip-bottom cursor-pointer" data-tip="wish list"><FaShoppingCart className='border rounded-full p-1  text-2xl' /></div>


<div className="drawer">
  <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
   
    <label htmlFor="my-drawer-1" className="tooltip tooltip-bottom md:hidden cursor-pointer" data-tip="user"><FaUser className='border rounded-full p-1  text-2xl' /></label>

  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay flex items-center "></label>
  
       <Aside data={'show'}/>
       
  </div>
</div>





                {/* <div className="tooltip md:hidden tooltip-bottom cursor-pointer" data-tip="wish list"><FaShoppingCart className='border rounded-full p-1  text-2xl' /></div> */}
                {/* <div className="tooltip  tooltip-bottom md:hidden cursor-pointer" data-tip="user"><FaUser className='border rounded-full p-1  text-2xl' /></div> */}

            </div>

        </nav>

    </div>
  )
}

export default Nav