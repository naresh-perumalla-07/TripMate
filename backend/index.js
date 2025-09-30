import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
let port = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://trip-mate-sage.vercel.app",
    credentials:true
}))
// serve uploads if needed by multer
app.use(express.static("public"))

if(!process.env.MAPBOX_TOKEN){
    console.warn("MAPBOX_TOKEN not set. Geocoding and maps may not work.")
}

app.use("/api/auth", authRouter )
app.use("/api/user", userRouter )
app.use("/api/listing",listingRouter )
app.use("/api/booking",bookingRouter )


app.listen(port,()=>{
    connectDb()
    console.log(`The App is listening on ${port} port`)
})