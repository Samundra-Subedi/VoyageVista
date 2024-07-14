import { useState } from 'react';
import CardComponent from '../components/Card';
import ReviewComponent from '../components/Reviews';
import ChatWithAI from '../components/ChatWithAI';
import AddPlaceModal from '../components/AddPlaceModal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// import { Link } from 'react-router-dom';

// Custom Button Component
const Button = ({ children, className, variant, size, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md';
  const variantStyles = variant === 'outline' ? 'border border-gray-300' : variant === 'ghost' ? 'bg-transparent' : 'bg-black text-white';
  const sizeStyles = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelDestinations, setTravelDestinations] = useState([
    {
      id: 1,
      name: 'Maui',
      image: '/maui.jpg',
      description: 'A tropical paradise with stunning beaches and beautiful landscapes.',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Paris',
      image: '/paris.jpg',
      description: 'The city of love, famous for its landmarks, museums, and cafes.',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Tokyo',
      image: '/tokyo.jpg',
      description: 'A bustling metropolis known for its modernity and rich cultural heritage.',
      rating: 4.6,
    },
    {
      id: 4,
      name: 'New Zealand',
      image: '/newzealand.jpg',
      description: 'Renowned for its stunning natural landscapes and adventure activities.',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Barcelona',
      image: '/barcelona.jpg',
      description: 'A vibrant city known for its art, architecture, and lively atmosphere.',
      rating: 4.5,
    },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPlace = (event) => {
    event.preventDefault();
    const newPlace = {
      id: travelDestinations.length + 1,
      name: event.target.name.value,
      image: event.target.image.value,
      description: event.target.description.value,
      rating: parseFloat(event.target.rating.value),
    };
    setTravelDestinations([...travelDestinations, newPlace]);
    closeModal();
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Discover Your Next Adventure</h1>
            <p className="text-gray-600 text-lg">Browse and rate the best travel destinations.</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={openModal}>Add New Place</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {travelDestinations.map((destination) => (
            <CardComponent key={destination.id} destination={destination} />
          ))}
        </div>

        <ChatWithAI />
        <AddPlaceModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddPlace} />
      </div>
      <Footer />
    </>
  );
}
