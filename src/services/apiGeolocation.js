import axios from 'axios';

const apiGeolocation = axios.create({
    baseURL: "http://nominatim.openstreetmap.org"
});

export default apiGeolocation;