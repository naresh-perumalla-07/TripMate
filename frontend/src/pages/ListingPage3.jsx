
import React, { useContext } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';

function ListingPage3() {
    const navigate = useNavigate();
    const {
        title, description, frontEndImage1, frontEndImage2, frontEndImage3,
        landmark, city, category, rent, handleAddListing, adding
    } = useContext(listingDataContext);

    return (
        <div className='w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start gap-6 py-6 relative px-4'>

            {/* Back Button */}
           
            <div
                className="self-start mb-4 px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer font-semibold hover:bg-red-600 transition"
                onClick={() => navigate("/")}
            >
                Back
            </div>

            {/* Header */}
            <h1 className='text-xl md:text-3xl font-bold text-gray-800 text-center mb-4'>
                {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
            </h1>

            {/* Images */}
            <div className='w-full max-w-5xl flex flex-col md:flex-row gap-4'>
                <div className='md:w-2/3 h-64 md:h-auto rounded-lg overflow-hidden shadow-md'>
                    <img src={frontEndImage1} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='md:w-1/3 flex flex-col gap-4'>
                    <div className='h-32 md:h-1/2 rounded-lg overflow-hidden shadow-md'>
                        <img src={frontEndImage2} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='h-32 md:h-1/2 rounded-lg overflow-hidden shadow-md'>
                        <img src={frontEndImage3} alt="" className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className='w-full max-w-5xl flex flex-col gap-2 mt-4'>
                <h2 className='text-lg md:text-2xl font-semibold text-gray-800'>{`${title.toUpperCase()} ${category.toUpperCase()}, ${landmark.toUpperCase()}`}</h2>
                <p className='text-gray-700 text-base md:text-lg'>{description.toUpperCase()}</p>
                <p className='text-red-600 font-semibold text-lg md:text-xl'>{`Rs.${rent}/day`}</p>
            </div>

            {/* Add Listing Button */}
            <button
                className='mt-6 px-8 py-3 bg-red-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleAddListing}
                disabled={adding}
            >
                {adding ? "Adding..." : "Add Listing"}
            </button>
        </div>
    );
}

export default ListingPage3;
