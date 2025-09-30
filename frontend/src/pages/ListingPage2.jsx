
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { 
    FaArrowLeftLong, 
    FaTreeCity 
} from "react-icons/fa6";
import { 
    GiFamilyHouse, 
    GiWoodCabin 
} from "react-icons/gi";
import { 
    MdBedroomParent, 
    MdOutlinePool 
} from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { BiBuildingHouse } from "react-icons/bi";

function ListingPage2() {
    const navigate = useNavigate();
    const { category, setCategory } = useContext(listingDataContext);

    const categories = [
        { name: "Villa", value: "villa", icon: <GiFamilyHouse className='w-8 h-8 text-red-600' /> },
        { name: "Farm House", value: "farmHouse", icon: <FaTreeCity className='w-8 h-8 text-green-600' /> },
        { name: "Pool House", value: "poolHouse", icon: <MdOutlinePool className='w-8 h-8 text-blue-500' /> },
        
        { name: "Flat", value: "flat", icon: <BiBuildingHouse className='w-8 h-8 text-gray-700' /> },
        { name: "PG", value: "pg", icon: <IoBedOutline className='w-8 h-8 text-orange-500' /> },
        { name: "Cabin", value: "cabin", icon: <GiWoodCabin className='w-8 h-8 text-brown-600' /> },
        
    ];

    return (
        <div className='w-full min-h-screen bg-gray-100 flex flex-col items-center justify-start relative px-4 py-6'>
            {/* Back Button */}
            
            <div
                className="self-start mb-4 px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer font-semibold hover:bg-red-600 transition"
                onClick={() => navigate("/listingpage1")}
            >
                Back
            </div>

            {/* Header */}
            <div className='text-white bg-red-500 px-6 py-3 rounded-full font-semibold text-lg md:text-xl shadow-md absolute top-6 right-6'>
                Set Your Category
            </div>

            {/* Page Title */}
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mt-20 mb-6 text-center'>
                Which of these best describes your place?
            </h1>

            {/* Category Options */}
            <div className='flex flex-wrap justify-center items-center gap-6 md:gap-8 max-w-5xl w-full'>
                {categories.map((cat) => (
                    <div 
                        key={cat.value}
                        className={`flex flex-col items-center justify-center w-40 h-28 md:w-44 md:h-32 cursor-pointer border-2 rounded-xl transition hover:border-gray-400 
                            ${category === cat.value ? "border-red-500 shadow-lg" : "border-gray-300"}`}
                        onClick={() => setCategory(cat.value)}
                    >
                        {cat.icon}
                        <span className='mt-2 font-medium text-gray-700'>{cat.name}</span>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <button
                className='mt-8 px-8 py-3 bg-red-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => navigate("/listingpage3")}
                disabled={!category}
            >
                Next
            </button>
        </div>
    );
}

export default ListingPage2;
