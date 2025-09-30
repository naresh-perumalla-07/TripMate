import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { bookingDataContext } from '../Context/BookingContext';
import { toast } from 'react-toastify';
import { Map, Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo } from 'react';

function ViewCard() {
    let navigate=useNavigate()
    let {cardDetails}=useContext(listingDataContext)
    let {userData} = useContext(userDataContext)
    let [updatePopUp,setUpdatePopUp]= useState(false)
    let [bookingPopUp,setBookingPopUp]= useState(false)
    let [title,setTitle] = useState(cardDetails.title)
    let [description,setDescription]=useState(cardDetails.description)
    let [backEndImage1,setBackEndImage1]=useState(null)
    let [backEndImage2,setBackEndImage2]=useState(null)
    let [backEndImage3,setBackEndImage3]=useState(null)
    let [rent,setRent]=useState(cardDetails.rent)
    let [city,setCity]=useState(cardDetails.city)
    let [landmark,setLandmark]=useState(cardDetails.landMark)
    let {serverUrl}= useContext(authDataContext)
    let {updating,setUpdating} = useContext(listingDataContext)
    let {deleting,setDeleting} = useContext(listingDataContext)
    let [minDate,setMinDate] = useState("")
    let {checkIn,setCheckIn,
        checkOut,setCheckOut,
        total,setTotal,
        night,setNight,handleBooking,booking}=useContext(bookingDataContext)

    useEffect(()=>{
        if(checkIn && checkOut){
            let inDate = new Date(checkIn)
            let OutDate = new Date(checkOut)
            let n = (OutDate - inDate)/(24*60*60*1000)
            setNight(n)
            let airBnbCharge = (cardDetails.rent*(7/100))
            let tax = (cardDetails.rent*(7/100))

            if(n>0){
                setTotal((cardDetails.rent * n) + airBnbCharge + tax)
            }
            else{
                setTotal(0)
            }
        }
    },[checkIn,checkOut,cardDetails.rent,total])

    const handleUpdateListing =async () => {
        setUpdating(true)
        try {
            let formData = new FormData()
            formData.append("title",title)
            if(backEndImage1){formData.append("image1",backEndImage1)}
            if(backEndImage2){formData.append("image2",backEndImage2)}
            if(backEndImage3){formData.append("image3",backEndImage3)}
            formData.append("description",description)
            formData.append("rent",rent)
            formData.append("city",city)
            formData.append("landMark",landmark)

            let result = await axios.post( serverUrl + `/api/listing/update/${cardDetails._id}` ,formData, {withCredentials:true}  )
            setUpdating(false)
            console.log(result)
            toast.success("Listing Updated")
            navigate("/")
            setTitle("")
            setDescription("")
            setBackEndImage1(null)
            setBackEndImage2(null)
            setBackEndImage3(null)
            setRent("")
            setCity("")
            setLandmark("")
        } catch (error) {
            setUpdating(false)
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const handleDeleteListing = async () => {
        setDeleting(true)
        try {
            let result = await axios.delete( serverUrl + `/api/listing/delete/${cardDetails._id}`, {withCredentials:true}  )
            console.log(result.data)
            navigate("/")
            toast.success("Listing Deleted")
            setDeleting(false)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const handleImage1 = (e)=> setBackEndImage1(e.target.files[0])
    const handleImage2 = (e)=> setBackEndImage2(e.target.files[0])
    const handleImage3 = (e)=> setBackEndImage3(e.target.files[0])

    useEffect(()=>{setMinDate(new Date().toISOString().split('T')[0])},[])

    // Client-side geocode fallback for legacy listings without geometry
    const hasCoords = Array.isArray(cardDetails?.geometry?.coordinates) && cardDetails.geometry.coordinates.length === 2
    const [fallbackCoords,setFallbackCoords] = useState(null)
    useEffect(()=>{
        const doGeocode = async ()=>{
            try{
                if(hasCoords || !cardDetails?.city || !cardDetails?.landMark){return}
                const query = encodeURIComponent(`${cardDetails.landMark}, ${cardDetails.city}`)
                const token = import.meta.env.VITE_MAPBOX_TOKEN
                if(!token) return
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&limit=1`
                const res = await fetch(url)
                const data = await res.json()
                const feature = data?.features?.[0]
                if(feature?.center?.length === 2){
                    setFallbackCoords([feature.center[0], feature.center[1]])
                }
            }catch(e){
                console.log(e)
            }
        }
        doGeocode()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cardDetails?._id])

    const coords = useMemo(()=>{
        if(hasCoords) return cardDetails.geometry.coordinates
        if(Array.isArray(fallbackCoords)) return fallbackCoords
        return null
    },[hasCoords, cardDetails?.geometry?.coordinates, fallbackCoords])

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex flex-col items-center justify-start gap-8 relative py-12'>

            {/* Back Button */}
            
            <div
                className="self-start mb-4 px-4 py-2 ml-4 bg-red-500 text-white rounded-md cursor-pointer font-semibold hover:bg-red-600 transition"
                onClick={() => navigate("/")}
            >
                Back
            </div>


            {/* Title */}
            <div className='w-[95%] md:w-[80%] text-2xl md:text-3xl font-extrabold text-gray-900 tracking-wide text-center md:text-left px-4'>
                {`In ${cardDetails.landMark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}
            </div>

            {/* Images */}
            <div className='w-[95%] md:w-[80%] flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-2/3 h-64 md:h-96 overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300'>
                    <img src={cardDetails.image1} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='w-full md:w-1/3 flex flex-col gap-4'>
                    <div className='w-full h-32 md:h-44 overflow-hidden rounded-xl shadow-md hover:scale-[1.05] transition-transform duration-300'>
                        <img src={cardDetails.image2} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='w-full h-32 md:h-44 overflow-hidden rounded-xl shadow-md hover:scale-[1.05] transition-transform duration-300'>
                        <img src={cardDetails.image3} alt="" className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>

            {/* Info Card */}
            <div className='w-[95%] md:w-[80%] grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='md:col-span-2 bg-white p-6 rounded-xl shadow-md'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>{cardDetails.title.toUpperCase()} {cardDetails.category.toUpperCase()}</h2>
                    <p className='text-gray-600 leading-relaxed md:text-lg'>{cardDetails.description}</p>
                </div>
                <div className='bg-white p-6 rounded-xl shadow-md h-max'>
                    <p className='text-gray-900 font-semibold text-xl md:text-2xl'>{`Rs.${cardDetails.rent}/day`}</p>
                    <div className='flex gap-4 mt-4'>
                        {cardDetails.host == userData._id && 
                            <button className='flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200' onClick={()=>setUpdatePopUp(prev => !prev)}>Edit Listing</button>}
                        {cardDetails.host != userData._id && 
                            <button className='flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200' onClick={()=>setBookingPopUp(prev => !prev)}>Reserve</button>}
                    </div>
                </div>
            </div>

            {/* Map */}
            {Array.isArray(coords) ? (
                <div className='w-[95%] md:w-[80%]'>
                    <div className='w-full h-[340px] md:h-[460px] rounded-xl overflow-hidden shadow-md bg-white p-1'>
                        <Map
                            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                            initialViewState={{
                                longitude: coords[0],
                                latitude: coords[1],
                                zoom: 12
                            }}
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/streets-v12"
                        >
                            <Marker longitude={coords[0]} latitude={coords[1]} anchor="bottom">
                                <div className='w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow'></div>
                            </Marker>
                            <Popup
                                longitude={coords[0]}
                                latitude={coords[1]}
                                closeButton={false}
                                closeOnClick={false}
                                anchor="top"
                            >
                                <div className='text-sm font-medium'>Exact location provided after booking.</div>
                            </Popup>
                        </Map>
                    </div>
                </div>
            ) : (
                <div className='w-[95%] md:w-[80%] text-sm text-gray-600'>Loading location...</div>
            )}

            {/* ---------- Update Modal ---------- */}
            {updatePopUp && (
                <div className='w-full h-full flex items-center justify-center bg-black/60 absolute top-0 left-0 z-50 p-4'>
                    <RxCross2 className='w-8 h-8 bg-red-500 cursor-pointer rounded-full absolute top-6 right-6 flex items-center justify-center text-white shadow-lg hover:scale-110 transition' onClick={()=>setUpdatePopUp(false)} />
                    <form className='w-full max-w-2xl h-[550px] overflow-auto bg-white p-6 rounded-xl flex flex-col gap-4 shadow-lg text-gray-900' onSubmit={(e)=>e.preventDefault()}>
                        <h2 className='text-2xl font-bold mb-2 text-center text-red-600'>Update Listing</h2>
                        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className='p-3 rounded-md border' />
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className='p-3 rounded-md border resize-none h-24'></textarea>
                        <input type="file" onChange={handleImage1} className='p-2 rounded-md border'/>
                        <input type="file" onChange={handleImage2} className='p-2 rounded-md border'/>
                        <input type="file" onChange={handleImage3} className='p-2 rounded-md border'/>
                        <input type="number" value={rent} onChange={(e)=>setRent(e.target.value)} placeholder="Rent" className='p-3 rounded-md border'/>
                        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" className='p-3 rounded-md border'/>
                        <input type="text" value={landmark} onChange={(e)=>setLandmark(e.target.value)} placeholder="Landmark" className='p-3 rounded-md border'/>
                        <div className='flex gap-4 mt-6'>
                            <button className='flex-1 bg-gradient-to-r from-red-500 to-red-600 py-2 rounded-lg text-white font-semibold shadow-md hover:opacity-90 hover:scale-[1.02] transition' onClick={handleUpdateListing} disabled={updating}>{updating ? "Updating..." : "Update"}</button>
                            <button className='flex-1 bg-gray-200 py-2 rounded-lg text-gray-900 font-semibold shadow-md hover:bg-gray-300 transition' onClick={handleDeleteListing} disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ---------- Booking Modal ---------- */}
            {bookingPopUp && (
                <div className='w-full min-h-full flex items-center justify-center bg-black/40 absolute top-0 left-0 z-50 p-4 backdrop-blur-sm'>
                    <RxCross2 className='w-8 h-8 bg-red-500 cursor-pointer rounded-full absolute top-6 right-6 flex items-center justify-center text-white shadow-lg hover:scale-110 transition' onClick={()=>setBookingPopUp(false)}/>
                    <form className='w-full max-w-md bg-white p-6 rounded-xl flex flex-col gap-4 shadow-lg' onSubmit={(e)=>e.preventDefault()}>
                        <h2 className='text-xl font-bold text-center text-red-600'>Confirm & Book</h2>
                        <label className='text-sm font-medium text-gray-700'>Check-in</label>
                        <input type="date" min={minDate} value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} className='p-3 rounded-md border'/>
                        <label className='text-sm font-medium text-gray-700'>Check-out</label>
                        <input type="date" min={minDate} value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} className='p-3 rounded-md border'/>
                        <button className='bg-gradient-to-r from-red-500 to-red-600 py-3 rounded-lg text-white font-semibold shadow-md hover:opacity-90 hover:scale-[1.02] transition mt-4' onClick={()=>handleBooking(cardDetails._id)} disabled={booking}>{booking ? "Booking..." : "Book Now"}</button>
                    </form>
                </div>
            )}

        </div>
    )
}

export default ViewCard
