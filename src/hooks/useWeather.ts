
import axios from "axios";
import { SearchType } from "../types/Index";
import { z } from "zod";
import { useMemo, useState } from "react";
/* import { string, object, number,InferOutput,parse } from 'valibot'; */

//Type Guard assertion
/* function isWeatherResponse(weather: unknown) {
    return (
        Boolean(weather) &&
        typeof weather === 'object' &&
        typeof (weather as Weather).name === 'string' &&
        typeof (weather as Weather).main.temp === 'number' &&
        typeof (weather as Weather).main.temp_max === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number'

    )
} */
//Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})
    export type Weather = z.infer<typeof Weather>
    //Valibot
/*     const weatherSchema=object({

        name:string(),
        main:object({
            temp:number(),
            temp_max:number(),
            temp_min:number()

        })
    }) */
/* type Weather=InferOutput<typeof weatherSchema> */

export default function useWeather() {

    const[weather,setWeather]=useState({
        name:'',
        main:{

            temp:0,
            temp_max:0,
            temp_min:0
        }

    })

    const fetchWeather = async (search: SearchType) => {


        const appId = import.meta.env.VITE_API_KEY;
        try {

            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            /*  const { data } = await axios(geoUrl)
             const lat = data[0].lat;
             const lon = data[0].lon;
 
           
             console.log(weatherURL);
             //type Guards
             const { data: weatherResult } = await axios(weatherURL);
             const result = isWeatherResponse(weatherResult);
             if (result) {
 
                 console.log(weatherResult.name);
 
             } */
            //Zod
            const { data:weatherResult } = await axios(weatherURL)
            const result= Weather.safeParse(weatherResult)

            if (result.success) {
                setWeather(result.data)
                
            }
            console.log(result);

            //Valibot
     /*        const { data:weatherResult } = await axios(weatherURL)            
            const result=parse(weatherSchema,weatherResult)
            console.log(result); */
            
            
        } catch (error) {
            console.log(error);

        }


    }
const hasWeatherData=useMemo(()=>weather.name,[weather])
    return {
        fetchWeather,
        weather,
        hasWeatherData
    }
}