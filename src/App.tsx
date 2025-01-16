
import styles from './App.module.css'
import Form from './components/Form/Form'
import WeatherDitails from './components/WeatherDitails/WeatherDitails';
import useWeather from './hooks/useWeather'

function App() {

  const { fetchWeather, weather, hasWeatherData } = useWeather();
  return (

    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}

        />
        {hasWeatherData &&

          <WeatherDitails
            weather={weather}
          />
        }

      </div>
    </>
  )
}

export default App
