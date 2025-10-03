
import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { useNavigate } from 'react-router-dom';
import Star from '../Component/Star';
import { userDataContext } from '../Context/UserContext';
import { authDataContext } from '../Context/AuthContext';
import { listingDataContext } from '../Context/ListingContext';
import axios from 'axios';

function Booked() {
    let { bookingData } = useContext(bookingDataContext)
    let [star, setStar] = useState(0)
    let { serverUrl } = useContext(authDataContext)
    let { getCurrentUser } = useContext(userDataContext)
    let { getListing, cardDetails } = useContext(listingDataContext)
    let navigate = useNavigate()
   
    const handleRating = async (id) => {
        try {
            let result = await axios.post(serverUrl + `/api/listing/ratings/${id}`, {
                ratings: star
            }, { withCredentials: true })
            await getListing()
            await getCurrentUser()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
   g
    const handleStar = async (value) => {
        setStar(value)
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-start py-10 gap-8 px-4 md:px-0'>

            {/* Back Button */}
            <button
                className='self-end px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition fixed top-5 right-5 md:static md:self-end'
                onClick={() => navigate("/")}>
                Back to Home
            </button>

            {/* Booking Confirmation Card */}
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col items-center gap-6 p-6 transition hover:scale-105'>
                <GiConfirmed className='w-24 h-24 text-green-500 animate-bounce' />
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 text-center'>Booking Confirmed</h2>
                <div className='w-full flex flex-col gap-3 text-gray-700'>
                    <div className='flex justify-between px-4'>
                        <span className='font-medium'>Booking Id:</span>
                        <span className='break-all text-right'>{bookingData._id}</span>
                    </div>
                    <div className='flex justify-between px-4'>
                        <span className='font-medium'>Owner Details:</span>
                        <span className='text-right'>{bookingData.host?.email}</span>
                    </div>
                    <div className='flex justify-between px-4'>
                        <span className='font-medium'>Total Rent:</span>
                        <span className='text-right'>₹{bookingData.totalRent}</span>
                    </div>
                </div>
            </div>

            {/* Rating Card */}
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col items-center gap-4 p-6 transition hover:scale-105'>
                <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>{star} out of 5 Rating</h2>
                <Star onRate={handleStar} />
                <button
                    className='px-8 py-3 bg-red-500 text-white text-lg rounded-xl shadow hover:bg-red-600 transition mt-2 w-full md:w-auto'
                    onClick={() => handleRating(cardDetails._id)}>
                    Submit
                </button>
            </div>

            {/* Optional: add a subtle footer for spacing */}
            <div className='h-10 md:h-20'></div>

        </div>
    )
}

export default Booked

