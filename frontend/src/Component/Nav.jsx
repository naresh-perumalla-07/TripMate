
import React, { useContext, useEffect, useState, useRef } from 'react'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { WiSnowflakeCold } from "react-icons/wi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { MdAddHomeWork, MdListAlt, MdOutlineEventAvailable } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';

function Nav() {
    let [showpopup, setShowpopup] = useState(false)
    const menuRef = useRef(null)
    let { userData, setUserData } = useContext(userDataContext)
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    let [cate, setCate] = useState()
    let { listingData, setNewListData, searchData, handleSearch, handleViewCard } = useContext(listingDataContext)
    let [input, setInput] = useState("")

    // ---------- FIXED LOGOUT ----------
    const handleLogOut = async () => {
        try {
            const res = await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
            console.log(res.data); // Should log {message: "Logout Successfully"}
            setUserData(null)       // Clear user context
            setShowpopup(false)     // Close popup
            navigate("/login")      // Optional: redirect to login
        } catch (error) {
            console.log(error)
        }
    }

        const categoryMap = {
    "Villa": "Villa",
    "Farm House": "Farm House",
    "Pool House": "Pool House",  
    "Flat": "Cottage",        
    "PG": "PG",         
    "Snow Haven": "Snow Haven",
    "Cabins": "Cabins"
    };

   const handleCategory = (category) => {
  setCate(category);

  if (category === "Trending") {
    setNewListData(listingData); // all listings
  } else {
    const mappedCategory = categoryMap[category];
    setNewListData(listingData.filter(
      list => list.category === mappedCategory
    ));
  }
};



    const handleClick = (id) => {
        if (userData) {
            handleViewCard(id)
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        handleSearch(input)
    }, [input])

    // close menu on outside click or Esc
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showpopup && menuRef.current && !menuRef.current.contains(e.target)) {
                setShowpopup(false)
            }
        }
        const handleEsc = (e) => {
            if (e.key === 'Escape') setShowpopup(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEsc)
        }
    }, [showpopup])

    return (
        <div className='fixed top-0 bg-white z-20 w-full'>
            {/* Top bar */}
            <div className='w-full min-h-[80px] border-b-[1px] border-[#dcdcdc] px-5 md:px-10 flex items-center justify-between'>
                <div className='flex items-center gap-3 cursor-pointer select-none' onClick={() => navigate("/")}>
                    <div className='w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center shadow-md'>
                        <MdTravelExplore className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                    <div className='leading-tight'>
                        <span className='block text-[22px] md:text-[26px] font-extrabold tracking-tight text-gray-900'>
                            <span className='text-red-600'>Trip</span>Mate
                        </span>
                        <span className='hidden md:block text-[11px] text-gray-500 tracking-wide'>Find your perfect stay</span>
                    </div>
                </div>

                {/* Search bar */}
                <div className='w-[35%] relative hidden md:block'>
                    <input
                        type="text"
                        className='w-full px-[30px] py-[10px] border-2 border-[#bdbaba] outline-none rounded-[30px] text-[17px]'
                        placeholder='Any Where  |  Any Location  |  Any City'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className='absolute p-2 rounded-full bg-red-500 right-[3%] top-[5px]'>
                        <FiSearch className='w-5 h-5 text-white' />
                    </button>
                </div>

                {/* Right buttons */}
                <div className='flex items-center gap-3 relative'>
                    <span
                        className='text-[20px] cursor-pointer rounded-full hover:bg-[#ded9d9] px-4 py-2 hidden md:block'
                        onClick={() => navigate("/listingpage1")}
                    >
                        List your home
                    </span>

                    <button
                        className='px-4 py-2 flex items-center gap-2 rounded-full border border-gray-300 bg-white/80 backdrop-blur hover:bg-white shadow-sm transition'
                        onClick={() => setShowpopup(prev => !prev)}
                    >
                        <GiHamburgerMenu className='w-5 h-5' />
                        {userData == null && <CgProfile className='w-6 h-6' />}
                        {userData != null &&
                            <span className='w-8 h-8 bg-black text-white rounded-full flex items-center justify-center'>
                                {userData?.name.slice(0, 1)}
                            </span>
                        }
                    </button>

                    {showpopup && (
                        <div ref={menuRef} className='absolute top-[110%] right-0 z-20'>
                            <div className='relative'>
                                <div className='absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-200'></div>
                                <div className='min-w-[260px] rounded-xl border border-gray-200 bg-white/95 backdrop-blur shadow-xl overflow-hidden'>
                                    <ul className='py-2'>
                                        {!userData && (
                                            <li className='px-3'>
                                                <button className='w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-800' onClick={() => { navigate("/login"); setShowpopup(false) }}>
                                                    <FiLogIn className='w-5 h-5 text-gray-500' />
                                                    <span className='text-[15px]'>Login</span>
                                                </button>
                                            </li>
                                        )}
                                        {userData && (
                                            <li className='px-3'>
                                                <button className='w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-800' onClick={handleLogOut}>
                                                    <FiLogOut className='w-5 h-5 text-gray-500' />
                                                    <span className='text-[15px]'>Logout</span>
                                                </button>
                                            </li>
                                        )}
                                        <li className='my-1 mx-2 h-px bg-gray-200'></li>
                                        <li className='px-3'>
                                            <button className='w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-800' onClick={() => { navigate("/listingpage1"); setShowpopup(false) }}>
                                                <MdAddHomeWork className='w-5 h-5 text-gray-500' />
                                                <span className='text-[15px]'>List your Home</span>
                                            </button>
                                        </li>
                                        <li className='px-3'>
                                            <button className='w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-800' onClick={() => { navigate("/mylisting"); setShowpopup(false) }}>
                                                <MdListAlt className='w-5 h-5 text-gray-500' />
                                                <span className='text-[15px]'>My Listing</span>
                                            </button>
                                        </li>
                                        <li className='px-3'>
                                            <button className='w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-800' onClick={() => { navigate("/mybooking"); setShowpopup(false) }}>
                                                <MdOutlineEventAvailable className='w-5 h-5 text-gray-500' />
                                                <span className='text-[15px]'>My Booking</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile search */}
                <div className='w-full h-[60px] flex items-center justify-center md:hidden mt-2'>
                    <div className='w-[80%] relative'>
                        <input
                            type="text"
                            className='w-full px-[30px] py-[10px] border-2 border-[#bdbaba] outline-none rounded-[30px] text-[17px]'
                            placeholder='Any Where  |  Any Location  |  Any City'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                        <button className='absolute p-2 rounded-full bg-red-500 right-[3%] top-[5px]'>
                            <FiSearch className='w-5 h-5 text-white' />
                        </button>
                    </div>
                </div>

                {/* Search results */}
                {searchData?.length > 0 && (
                    <div className='w-full flex flex-col items-center gap-5 absolute top-[120%] left-0 overflow-auto'>
                        <div className='max-w-[700px] w-full h-[300px] flex flex-col bg-[#fefdfd] p-5 rounded-lg border border-[#a2a1a1] overflow-auto'>
                            {searchData.map(search => (
                                <div key={search._id} className='border-b border-black p-2 cursor-pointer' onClick={() => handleClick(search._id)}>
                                    {search.title} in {search.landMark}, {search.city}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Category icons */}
            <div className='w-full h-[85px] bg-white flex items-center justify-center gap-10 overflow-x-auto px-5 py-3'>
                <div className={`flex flex-col items-center cursor-pointer ${cate === "trending" ? "border-b-2 border-black" : ""}`} onClick={() => { handleCategory("Trending"); setCate("") }}>
                    <MdWhatshot className='w-8 h-8' />
                    <h3 className='text-[13px]'>Trending</h3>
                </div>

                <div className={`flex flex-col items-center cursor-pointer ${cate === "villa" ? "border-b-2 border-black" : ""}`} onClick={() => handleCategory("Villa")}>
                    <GiFamilyHouse className='w-8 h-8' />
                    <h3 className='text-[13px]'>Villa</h3>
                </div>

                <div className={`flex flex-col items-center cursor-pointer ${cate === "farmHouse" ? "border-b-2 border-black" : ""}`} onClick={() => handleCategory("Farm House")}>
                    <FaTreeCity className='w-8 h-8' />
                    <h3 className='text-[13px]'>Farm House</h3>
                </div>

                <div className={`flex flex-col items-center cursor-pointer ${cate === "poolHouse" ? "border-b-2 border-black" : ""}`} onClick={() => handleCategory("Pool House")}>
                    <MdOutlinePool className='w-8 h-8' />
                    <h3 className='text-[13px]'>Pool House</h3>
                </div>

                

                <div className={`flex flex-col items-center cursor-pointer ${cate === "cabin" ? "border-b-2 border-black" : ""}`} 
                onClick={() => handleCategory("Snow Haven")}>
                    <WiSnowflakeCold className='w-8 h-8' /> 
                    <h3 className='text-[13px]'>Snow Haven</h3>
                </div>


                <div className={`flex flex-col items-center cursor-pointer ${cate === "pg" ? "border-b-2 border-black" : ""}`} onClick={() => handleCategory("PG")}>
                    <IoBedOutline className='w-8 h-8' />
                    <h3 className='text-[13px]'>PG</h3>
                </div>

                <div className={`flex flex-col items-center cursor-pointer ${cate === "cabin" ? "border-b-2 border-black" : ""}`} onClick={() => handleCategory("Cabins")}>
                    <GiWoodCabin className='w-8 h-8' />
                    <h3 className='text-[13px]'>Cabins</h3>
                </div>

                
            </div>
        </div>
    )
}

export default Nav
