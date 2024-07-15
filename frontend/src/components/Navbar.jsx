import React from 'react'
import { Link } from 'react-router-dom';
function Button({ children, variant = 'solid', className = '', ...props }) {
    const baseClass = 'px-4 py-2 rounded focus:outline-none transition';
    const variants = {
        solid: 'bg-[#f25f4c] text-white hover:bg-[#e04e3b]',
        outline: 'border border-[#f25f4c] text-[#f25f4c] hover:bg-[#f25f4c] hover:text-white',
        ghost: 'text-[#f25f4c] hover:bg-[#fef6e4]',
    };
    return (
        <button className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
const Navbar = () => {
    return (
        <header className="relative flex items-center justify-between px-8 py-4 lg:px-32">
            <div className="flex items-center space-x-2">
                <Link to='/'><span className="text-2xl font-bold text-[#1a202c]">VoyageVista</span></Link>
            </div>
            <nav className="flex items-center space-x-8 text-[#1a202c]">
                <Link to='/explore' className="hover:text-gray-700">
                    Explore
                </Link>
                <Link to='/about' className="hover:text-gray-700">
                    About
                </Link>
                <a href="https://quira.sh/" className="hover:text-gray-700">
                    Quine
                </a>
                <a href="#" className="hover:text-gray-700">
                    Github
                </a>
                <Link to='/contactus'><Button variant="outline">Contact Us</Button></Link> 
            </nav>
        </header>
    )
}

export default Navbar