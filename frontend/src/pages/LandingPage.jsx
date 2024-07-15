import { useState } from 'react';
import HeroImage from '../images/Traveller1.png'
import ServicesComponent from '../components/Features';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
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


export default function Component() {
    return (
        <>
            <div className="relative min-h-screen">
                <div className="absolute inset-0 bg-[#fef6e4] clip-patch" style={{ clipPath: 'circle(40% at 80% 23%)', zIndex: -1 }}></div>
                <div className="absolute inset-0 bg-[#fef6e4] clip-patch" style={{ clipPath: 'circle(27% at 13% 9%)', zIndex: -1 }}></div>
                {/* <div className="absolute inset-0 bg-[#fef6e4] clip-patch" style={{clipPath: 'circle(23.5% at 0 74%)', zIndex: -1 }}></div> */}
                <Navbar />
                <main className="relative flex flex-col items-center justify-center px-8 py-16 lg:flex-row lg:justify-between lg:px-32">
                    <div className="max-w-xl space-y-6 lg:pb-24">
                        <h2 className="text-xl font-semibold text-[#f25f4c]">BEST DESTINATIONS AROUND THE WORLD</h2>
                        <div className="text-6xl font-bold text-[#0a2239] font-serif tracking-tighter leading-tight">
                            Travel, enjoy and live a new and full life
                        </div>
                        <p className="text-lg text-[#1a202c]">
                            Embark on unforgettable adventures around the globe, share breathtaking views and stories with fellow travelers, uncover hidden gems in every corner, and enjoy personalized travel insights and recommendations powered by cutting-edge AI technology.
                        </p>
                        <div className="flex items-center space-x-4">
                            <Link to='/explore'>
                                <Button className="bg-[#F1A501] text-white shadow-md shadow-[#F1A501] hover:bg-[#e09900]">Find out more</Button>
                            </Link>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <PlayIcon className="h-6 w-6 text-[#f25f4c]" />
                                <span>Play Demo</span>
                            </Button>
                        </div>
                    </div>
                    <div className="relative mt-12 lg:mt-0">
                        <img src={HeroImage} alt="Traveler" className="w-full h-auto" />

                    </div>
                </main>

            </div>
            <Footer />
        </>
    );
}

function PlayIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
    );
}
