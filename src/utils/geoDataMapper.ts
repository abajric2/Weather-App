import { ApiGeoDataResponse } from "../interfaces/ApiGeoDataResponse";
import { GeoData } from "../interfaces/GeoData";

export const mapGeoData = (data: ApiGeoDataResponse): GeoData => ({
    lat: data.lat,
    lon: data.lon,
    city: data.name
});