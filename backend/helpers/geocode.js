import axios from "axios";

export const geocodeCityLandmark = async ({ city, landMark }) => {
    try {
        const token = process.env.MAPBOX_TOKEN;
        if(!token){
            return null;
        }
        const query = encodeURIComponent(`${landMark}, ${city}`);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&limit=1`;
        const { data } = await axios.get(url);
        const feature = data && data.features && data.features[0];
        if(!feature || !feature.center || feature.center.length < 2){
            return null;
        }
        // Mapbox returns [lng, lat]
        return [feature.center[0], feature.center[1]];
    } catch (error) {
        return null;
    }
}

export default geocodeCityLandmark;



