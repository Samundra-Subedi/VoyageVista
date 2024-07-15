import React, { useState, useEffect } from 'react';
import { FaStar, FaMapMarkerAlt, FaRegStar, FaRegThumbsUp, FaTimes, FaExclamationTriangle, FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Details() {
    const [reviews, setReviews] = useState([]);
    const [formRating, setFormRating] = useState(5);
    const [averageRating, setAverageRating] = useState(0);
    const location = useLocation();
    const details = location.state?.details || {};

    const backendUrl = 'http://localhost:3000'; // Update this with your backend URL
    const fallbackImage = '/images/fallback-image.jpg'; // Path to fallback image in the public folder
    const imageUrl = details.image ? `${backendUrl}${details.image}` : fallbackImage;

    useEffect(() => {
        fetch(`${backendUrl}/places/${details.id}/reviews`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                calculateAverageRating(data);
            });
    }, [details.id]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const average = total / reviews.length;
        setAverageRating(average.toFixed(1)); // Round to one decimal place
    };

    const handleSubmitReview = (event) => {
        event.preventDefault();
        const newReview = {
            name: event.target.name.value,
            rating: formRating,
            review: event.target.review.value,
        };
        fetch(`${backendUrl}/places/${details.id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
        })
            .then(response => response.json())
            .then(data => {
                const updatedReviews = [...reviews, { ...newReview, id: data.id }];
                setReviews(updatedReviews);
                calculateAverageRating(updatedReviews);
            });
    };

    return (
        <div className='flex flex-col justify-between'>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="relative rounded-lg overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="Place Image"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = fallbackImage; }}
                        />
                    </div>
                    <div className="grid gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{details.name}</h1>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                                <div>
                                    <div className="font-medium">Location</div>
                                    <div className="text-gray-600 text-sm">{details.location}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaStar className="w-5 h-5 text-yellow-500" />
                                <div>
                                    <div className="font-medium">Rating</div>
                                    <div className="text-gray-600 text-sm">{averageRating} (Average)</div>
                                </div>
                            </div>
                        </div>
                        <hr className="border-gray-300" />
                        <div>
                            <h2 className="text-2xl font-bold">About this place</h2>
                            <p className="text-gray-600 mt-2">
                                {details.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-20">
                    <div className="grid gap-8">
                        <div>
                            <h2 className="text-2xl font-bold">Review Analysis</h2>
                            <div className="mt-4 grid gap-4">
                                <Analysis title="Overall Sentiment" value="Overwhelmingly positive" icon={<FaExclamationTriangle />} />
                                <Analysis title="Key Highlights" value="Serene atmosphere, attention to detail, peaceful getaway" icon={<FaRegThumbsUp />} />
                                <Analysis title="Negative Feedback" value="None, all reviews are overwhelmingly positive" icon={<FaTimes />} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Reviews</h2>
                            <div className="mt-4 grid gap-6">
                                {reviews.map((review) => (
                                    <Review key={review.id} name={review.name} rating={review.rating} review={review.review} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">Leave a Review</h2>
                            <form className="mt-4 grid gap-4" onSubmit={handleSubmitReview}>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <input id="name" placeholder="Enter your name" className="border border-gray-300 rounded-md p-2" required />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                                    <div className="flex items-center gap-2">
                                        <Rating rating={formRating} setRating={setFormRating} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="review" className="text-sm font-medium">Review</label>
                                    <textarea id="review" rows={4} placeholder="Share your thoughts" className="border border-gray-300 rounded-md p-2" required />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md justify-self-start hover:bg-blue-600">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const Review = ({ name, rating, review }) => {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 border rounded-full overflow-hidden flex items-center justify-center">
                <FaUserCircle className="w-full h-full text-gray-400" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="font-medium">{name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        {Array.from({ length: 5 }, (_, i) =>
                            i < rating ? (
                                <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                            ) : (
                                <FaRegStar key={i} className="w-4 h-4 text-gray-400" />
                            )
                        )}
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{review}</p>
            </div>
        </div>
    );
};

const Analysis = ({ title, value, icon }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex-1">
                <div className="font-medium">{title}</div>
                <div className="text-gray-600 text-sm">{value}</div>
            </div>
            <div className="flex items-center gap-2">
                {icon}
                <div className="font-medium text-2xl">4.8</div>
            </div>
        </div>
    );
};

const Rating = ({ rating, setRating }) => {
    return (
        <>
            {Array.from({ length: 5 }, (_, i) => (
                i < rating ? (
                    <FaStar key={i} className="w-6 h-6 text-yellow-500 cursor-pointer" onClick={() => setRating(i + 1)} />
                ) : (
                    <FaRegStar key={i} className="w-6 h-6 text-gray-400 cursor-pointer" onClick={() => setRating(i + 1)} />
                )
            ))}
        </>
    );
};
