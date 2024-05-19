import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full bg-neutral-800 h-20 flex p-5 pr-10 text-xl justify-end gap-10 fixed mb-64'>
        <Link className='hover:scale-125 text-green-200' to="/employees" >Employee Table</Link>
        <Link className='hover:scale-125 text-yellow-200' to="/task">Task Table</Link>
        <Link className='hover:scale-125 text-red-200' to="/">Job Table</Link>
    </div>
  )
}

export default Navbar
