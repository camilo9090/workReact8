import { Weather } from "../../hooks/useWeather";
import { formatTemperature } from "../../Utils";




type WeatherDitailsProps = {

    weather: Weather;
}
export default function WeatherDitails({ weather }: WeatherDitailsProps) {

    const tempKelvin = formatTemperature(weather.main.temp)
    const tempKelvinMin = formatTemperature(weather.main.temp_min)
    const tempKelvinMax = formatTemperature(weather.main.temp_max)
    return (
        <div>

            <h2>Clima de:{weather.name}</h2>
            <p>

                {tempKelvin}&deg;c
            </p>
            <div>
                <p>Min:<span>{tempKelvinMin}&deg;c</span></p>
                <p>Max:<span>{tempKelvinMax}&deg;c</span></p>
            </div>
        </div>
    )
}
