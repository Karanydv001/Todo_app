import React from 'react'

const Navbar = () => {
  return (
    <div>
     <nav className='flex justify-between bg-slate-800 text-white hover:bg-slate-500 py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
     </nav>
    </div>
  )
}

export default Navbar
