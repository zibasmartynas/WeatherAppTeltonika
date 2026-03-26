import axios from 'axios'
//import { setupCache } from 'axios-cache-interceptor'

const API_KEY = 'c550eef6ebd088b812122c825fe952ed'
/*const BASE_URL = '/api/data/2.5/weather'*/
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
/*const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather';*/
console.log("Fetching from: ", BASE_URL)
//const axiosCached = setupCache(axios.create(), {ttl: 5*60*1000})

export function useWeather() {
  const fetchWeather = async (query) => {
    try {
      const res = await axios.get(BASE_URL, {
        params: {
          ...query,
          appid: API_KEY,
          units: 'metric'
        }
      })
      //console.log(res.cached + " cache update")
      return { data: res.data, error: null }
    } catch (error) {
        console.error(error)
      return { data: null, error }
    }
  }

  return { fetchWeather }
}