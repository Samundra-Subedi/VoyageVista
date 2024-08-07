import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/Card';
import ChatWithAI from '../components/ChatWithAI';
import AddPlaceModal from '../components/AddPlaceModal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelDestinations, setTravelDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:3000/places');
      setTravelDestinations(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddPlace = async () => {
    // const formData = new FormData(event.target);

    try {
      const response = await axios.post('http://localhost:3000/places', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTravelDestinations([...travelDestinations, response.data]);
      closeModal();
      window.location.reload();
      fetchPlaces();
    } catch (error) {
      console.error('Error adding place:', error);
    }
    window.location.reload();
  };

  const handleViewDetail = (details) => {
    navigate('/details', { state: { details } });
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 min-h-[60vh]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Discover Your Next Adventure</h1>
            <p className="text-gray-600 text-lg">Browse and rate the best travel destinations.</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={openModal}>Add New Place</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {travelDestinations.map((destination) => (
            <div className=' hover:cursor-pointer' onClick={() => { handleViewDetail(destination) }} key={destination.id}>
              <CardComponent key={destination.id} destination={destination} />
            </div>
          ))}
        </div>

        <ChatWithAI travelDestinations={travelDestinations} />
        <AddPlaceModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddPlace} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
