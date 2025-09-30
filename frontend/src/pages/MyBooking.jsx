
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../Context/UserContext';
import Card from '../Component/Card';

function MyBooking() {
    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 px-4 py-8">
            
            {/* Back Button */}
            <div
                className="self-start mb-4 px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer font-semibold hover:bg-red-600 transition"
                onClick={() => navigate("/")}
            >
                Back
            </div>
            

            {/* Page Title */}
            <div className="w-full max-w-xl text-center bg-white border border-gray-300 rounded-md p-4 mb-6 shadow-md">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">MY BOOKINGS</h1>
            </div>

            {/* Booking Cards */}
            <div className="w-full flex flex-wrap justify-center gap-6">
                {userData.booking && userData.booking.length > 0 ? (
                    userData.booking.map((list) => (
                        <Card
                            key={list._id}
                            title={list.title}
                            landMark={list.landMark}
                            city={list.city}
                            image1={list.image1}
                            image2={list.image2}
                            image3={list.image3}
                            rent={list.rent}
                            id={list._id}
                            isBooked={list.isBooked}
                            ratings={list.ratings}
                            host={list.host}
                            showCancel={true}
                        />
                    ))
                ) : (
                    <div className="w-full max-w-lg bg-white border border-gray-300 rounded-md p-6 text-center text-gray-600 shadow-md">
                        No bookings found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyBooking;
