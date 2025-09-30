import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const safeUnlink = (path) => {
    try {
        if (path && fs.existsSync(path)) {
            fs.unlinkSync(path)
        }
    } catch {}
}

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if(!filepath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filepath)
        safeUnlink(filepath)
        return uploadResult.secure_url
    } catch (error) {
        safeUnlink(filepath)
        console.log(error)
        throw error
    }
}

export default uploadOnCloudinary
    
