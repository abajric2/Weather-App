import { GeoData } from "../interfaces/GeoData";

export const mapGeoData = (data: any): GeoData => ({
    lat: data.lat,
    lon: data.lon,
    city: data.name
});