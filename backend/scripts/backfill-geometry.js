import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDb from "../config/db.js";
import Listing from "../model/listing.model.js";
import { geocodeCityLandmark } from "../helpers/geocode.js";

const run = async () => {
  try {
    await connectDb();
    const listings = await Listing.find({});
    let updated = 0;
    for (const listing of listings) {
      const hasCoords = listing.geometry && Array.isArray(listing.geometry.coordinates) && listing.geometry.coordinates.length === 2;
      if (hasCoords) continue;
      const coords = await geocodeCityLandmark({ city: listing.city, landMark: listing.landMark });
      if (coords) {
        listing.geometry = { type: "Point", coordinates: coords };
        await listing.save();
        updated++;
      } else {
        console.warn(`Failed to geocode listing ${listing._id} (${listing.city}, ${listing.landMark})`);
      }
    }
    console.log(`Backfill complete. Updated ${updated} listings.`);
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await mongoose.connection.close();
  }
};

run();



