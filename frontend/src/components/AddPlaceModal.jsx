import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const AddPlaceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:3000/places', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSubmit(response.data);
      onClose();
      console.log("Successful addition.")
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg z-10 w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Add a New Place</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">Fill out the form below to add a new place to our directory.</p>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="name" className="block text-gray-700">Place Name</label>
            <input id="name" name="name" type="text" placeholder="Enter the place name" className="w-full border border-gray-300 rounded-md p-2" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea id="description" name="description" placeholder="Provide a brief description of the place" rows={4} className="w-full border border-gray-300 rounded-md p-2" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div className="grid gap-2">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input id="location" name="location" type="text" placeholder="Enter the location" className="w-full border border-gray-300 rounded-md p-2" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <label htmlFor="image" className="block text-gray-700">Upload Image</label>
            <input id="image" name="image" type="file" className="w-full border border-gray-300 rounded-md p-2" onChange={handleChange} />
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-md justify-self-end hover:bg-black">
            Save Place
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal;
