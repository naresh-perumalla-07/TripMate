import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

export const createBooking = async (req,res) => {
   try {
    let {id} = req.params
    let {checkIn ,checkOut ,totalRent} = req.body
    
    let listing = await Listing.findById(id)
    if(!listing){
        return res.status(404).json({message:"Listing is not found"})
    }
    if (new Date(checkIn) >= new Date(checkOut)){
        return res.status(400).json({message:"Invaild checkIn/checkOut date"})

    }
    if(listing.isBooked){
        return res.status(400).json({message:"Listing is already Booked"})
    }
    let booking = await Booking.create({
        checkIn,
        checkOut,
        totalRent,
        host:listing.host,
        guest:req.userId,
        listing:listing._id
    })
    await booking.populate("host", "email" );
    let user = await User.findByIdAndUpdate(req.userId,{
        $push:{booking:listing}
    },{new:true})
    if(!user){
        return res.status(404).json({message:"User is not found"})
    }
    listing.guest=req.userId
    listing.isBooked=true
    await listing.save()
    return res.status(201).json(booking)

   } catch (error) {
    
    return res.status(500).json({message:`booking error ${error}`})
   }
    
}
export const cancelBooking = async (req,res) => {
    try {
        let {id} = req.params
        // id is listing id (based on current API). Load listing + find latest booking by this guest
        let listing = await Listing.findById(id)
        if(!listing){
            return res.status(404).json({message:"Listing not found"})
        }
        // Only host or the guest who booked can cancel
        const isAuthorized = String(listing.host) === String(req.userId) || String(listing.guest) === String(req.userId)
        if(!isAuthorized){
            return res.status(403).json({message:"Not authorized to cancel this booking"})
        }
        // Update booking doc status (the most recent one for this listing by the current user)
        const booking = await Booking.findOne({ listing: listing._id, guest: req.userId }).sort({ createdAt: -1 })
        if(booking){
            booking.status = "cancel"
            await booking.save()
        }
        // Update listing flags and user booking list only if current user is the active guest
        if(String(listing.guest) === String(req.userId)){
            listing.isBooked = false
            const previousGuest = listing.guest
            listing.guest = undefined
            await listing.save()
            if(previousGuest){
                await User.findByIdAndUpdate(previousGuest, { $pull: { booking: listing._id } })
            }
        }
        return res.status(200).json({message:"Booking cancelled"})

    } catch (error) {
        return res.status(500).json({message:"booking cancel error"})
    }
    
}