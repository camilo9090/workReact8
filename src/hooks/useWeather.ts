
import axios from "axios";
import { SearchType } from "../types/Index";

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {


        const appid='904ae78c8bfbe5f3b8a70243c430c071'
        try {

            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=
             ${search.city},${search.country}&appid=${appid}`;
             
             const data =await axios(geoUrl)

        } catch (error) {
            console.log(error);

        }


    }

    return {
        fetchWeather
    }
}