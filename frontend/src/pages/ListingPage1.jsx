
import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';

function ListingPage1() {
    let navigate = useNavigate();
    let {
        title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark
    } = useContext(listingDataContext);

    const handleImage = (e, setBack, setFront) => {
        const file = e.target.files[0];
        setBack(file);
        setFront(URL.createObjectURL(file));
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 flex justify-center py-10 px-4'>
            <form
                onSubmit={(e) => { e.preventDefault(); navigate("/listingpage2") }}
                className='w-full max-w-[750px] bg-white rounded-xl shadow-xl flex flex-col gap-6 p-8 relative'
            >
                {/* Back Button */}
                <button
                    type='button'
                    onClick={() => navigate("/")}
                    className='absolute top-5 left-5 flex items-center gap-2 text-red-500 font-semibold hover:text-red-600 transition'
                >
                    <FaArrowLeftLong className='w-5 h-5' /> Back
                </button>

                {/* Header */}
                <div className='text-center text-2xl md:text-3xl font-bold text-red-500 mb-6'>
                    Set Up Your Home
                </div>

                {/* Title */}
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-700'>Title</label>
                    <input
                        type='text'
                        placeholder='_bhk house or best title'
                        className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-700'>Description</label>
                    <textarea
                        className='w-full h-28 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition resize-none'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {/* Images */}
                {[1, 2, 3].map(num => (
                    <div key={num} className='flex flex-col gap-2'>
                        <label className='font-semibold text-gray-700'>Image {num}</label>
                        <input
                            type='file'
                            className='w-full text-sm px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition'
                            onChange={
                                num === 1 ? (e) => handleImage(e, setBackEndImage1, setFrontEndImage1) :
                                num === 2 ? (e) => handleImage(e, setBackEndImage2, setFrontEndImage2) :
                                (e) => handleImage(e, setBackEndImage3, setFrontEndImage3)
                            }
                            required
                        />
                        {num === 1 && frontEndImage1 && <img src={frontEndImage1} alt='preview1' className='mt-2 rounded-lg w-full h-52 object-cover shadow-sm' />}
                        {num === 2 && frontEndImage2 && <img src={frontEndImage2} alt='preview2' className='mt-2 rounded-lg w-full h-52 object-cover shadow-sm' />}
                        {num === 3 && frontEndImage3 && <img src={frontEndImage3} alt='preview3' className='mt-2 rounded-lg w-full h-52 object-cover shadow-sm' />}
                    </div>
                ))}

                {/* Rent */}
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-700'>Rent</label>
                    <input
                        type='number'
                        placeholder='Rs.______/day'
                        className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition'
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        required
                    />
                </div>

                {/* City */}
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-700'>City</label>
                    <input
                        type='text'
                        placeholder='City, Country'
                        className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                {/* Landmark */}
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-gray-700'>Landmark</label>
                    <input
                        type='text'
                        placeholder='Nearby landmark'
                        className='w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition'
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        required
                    />
                </div>

                {/* Next Button */}
                <button
                    type='submit'
                    className='w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition mt-4'
                >
                    Next
                </button>
            </form>
        </div>
    )
}

export default ListingPage1;

