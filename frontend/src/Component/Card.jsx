
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';

function Card({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host, showCancel = false }) {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);
  const { cancelBooking } = useContext(bookingDataContext);
  const [popUp, setPopUp] = useState(false);

  const handleClick = () => {
    if (isBooked && host !== userData?._id) {
      toast.info('Already booked — This place is currently unavailable.', { position: 'top-right' });
      return;
    }
    if (userData) handleViewCard(id);
    else navigate("/login");
  }

  return (
    <div className='w-[330px] max-w-[85%] flex-shrink-0 flex flex-col rounded-lg shadow-md bg-white relative cursor-pointer' onClick={handleClick}>
      
      {/* Carousel container */}
      <div className="w-full h-[220px] relative overflow-hidden rounded-t-lg group">
        <div className="flex w-[300%] h-full transition-transform duration-1000 ease-in-out group-hover:translate-x-[-66.666%]">
          <img src={image1} alt="" className="w-1/3 object-cover" />
          <img src={image2} alt="" className="w-1/3 object-cover" />
          <img src={image3} alt="" className="w-1/3 object-cover" />
        </div>
      </div>

      {/* Booked badge (outside carousel) */}
      {isBooked && (
        <div className='absolute top-2 right-2 z-10 flex items-center gap-1 p-1 bg-white rounded-lg text-green-600 text-sm'>
          <GiConfirmed className='w-5 h-5' /> Booked
        </div>
      )}

      {/* Cancel Booking badge (outside carousel) */}
      {isBooked && (host === userData?._id || showCancel) && (
        <div
          className='absolute top-12 right-2 z-10 flex items-center gap-1 p-1 bg-white rounded-lg text-red-600 cursor-pointer text-sm'
          onClick={(e) => { e.stopPropagation(); setPopUp(true); }}
        >
          <FcCancel className='w-5 h-5' /> Cancel
        </div>
      )}

      {/* Pop-up */}
      {popUp && (
        <div className='absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[300px] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center gap-2' onClick={(e)=>e.stopPropagation()}>
          {isBooked && host !== userData?._id && !showCancel ? (
            <>
              <p className='text-lg font-semibold text-gray-800'>Already Booked</p>
              <p className='text-gray-600 text-center'>This place is currently unavailable.</p>
              <button className='px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600'
                onClick={() => setPopUp(false)}
              >Got it</button>
            </>
          ) : (
            <>
              <p className='text-lg font-semibold text-gray-800'>Booking Cancel!</p>
              <p className='text-red-600 font-semibold'>Are you sure?</p>
              <div className='flex gap-4'>
                <button className='px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700'
                  onClick={(e) => { e.stopPropagation(); cancelBooking(id); setPopUp(false); }}
                >Yes</button>
                <button className='px-4 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600'
                  onClick={(e) => { e.stopPropagation(); setPopUp(false); }}
                >No</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Details */}
      <div className='p-3 flex flex-col gap-1'>
        <h2 className='text-[18px] font-semibold'>{title}</h2>
        <p className='text-[14px] text-gray-600'>{landMark}, {city}</p>
        <div className='flex justify-between items-center mt-2'>
          <span className='text-red-600 font-bold'>₹{rent}/day</span>
          <span className='flex items-center gap-1 text-[14px]'>
            <FaStar className='text-yellow-500 w-4 h-4' /> {ratings}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
