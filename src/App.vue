<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import WeatherTable from './components/WeatherTable.vue'
import AddForecastModal from './components/AddForecastModal.vue'
import Notification from './components/Notification.vue'
import { loadForecasts, saveForecasts } from './composables/storage'
import { useWeather } from './composables/useWeather'
import "./style.css"

const forecasts = ref([])
const search = ref('')
const showModal = ref(false)
const notification = ref(null)
const { fetchWeather } = useWeather()
let intervalId = null;
const logoURL = "https://www.clipartmax.com/png/middle/237-2372176_weather-app-weather-app-logo.png"
let notificationTimeout = null

onMounted(() => {
  forecasts.value = loadForecasts()

  refreshForecasts()

  intervalId = setInterval(refreshForecasts, 5*60*1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const filteredForecasts = computed(() => {
  return forecasts.value.filter(f =>
    f.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const generateId = () => {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const addForecast = (forecast) => {
  try {
    forecasts.value.unshift({ ...forecast, id: generateId() })
    saveForecasts(forecasts.value)

    showNotification({
      type: 'is-success',
      message: 'Forecast added!'
    })

  } catch (e) {
    showNotification({
      type: 'is-danger',
      message: 'Failed to add forecast'
    })
  }
}

const removeForecast = (id) => {
  try {
    forecasts.value = forecasts.value.filter(f => f.id !== id)
    saveForecasts(forecasts.value)

    showNotification({
      type: 'is-danger',
      message: 'Forecast removed!'
    })
  } catch (e) {
    showNotification({
      type: 'is-danger',
      message: 'Failed to remove forecast'
    })
  }
}

const refreshForecasts = async () => {
if(!forecasts.value.length) return

  const updated = []
  let hadError = false

  for (const f of forecasts.value) {
    try {
      const { data } = await fetchWeather({
        q: `${f.name},${f.sys.country}`
      })

      if (data) {
        updated.push({ ...data, id: f.id })
      } else {
        updated.push(f)
        hadError = true
      }
    } catch (e) {
      updated.push(f)
      hadError = true
    }
  }

  forecasts.value = updated
  saveForecasts(updated)
  console.log(new Date().toLocaleString() + " updated")

  showNotification({
    type: hadError ? 'is-warning' : 'is-info',
    message: hadError
      ? 'Some forecasts failed to update'
      : 'Forecasts updated successfully'
  })
}

const showNotification = (data) => {
  notification.value = data

  if (notificationTimeout) {
    clearTimeout(notificationTimeout)
  }

  notificationTimeout = setTimeout(() => {
    notification.value = null
  }, 3000)
}
</script>

<template>
  <div class="container mt-5">
    <div class="header is-flex is-align-items-center is-justify-content-center mb-4">
  <figure class="image is-64x64 mr-3 is-flex is-align-items-center">
    <img class="is-rounded" :src="logoURL" alt="LOGO" />
  </figure>

  <h1 class="title is-flex is-align-items-center">Weather App</h1>
</div>

    <div class="field is-grouped">
      <div class="control is-expanded">
        <input class="input" v-model="search" placeholder="Search for forecasts" />
      </div>
      <div class="control">
        <button class="button is-primary" @click="showModal = true">
          Add Forecast
        </button>
      </div>
    </div>

    <div class="notification-wrapper">
    <Notification v-if="notification" :data="notification" />
    </div>

    <WeatherTable
      :forecasts="filteredForecasts"
      @remove="removeForecast"
    />

    <AddForecastModal
      v-if="showModal"
      @close="showModal = false"
      @add="addForecast"
      @notify="showNotification"
    />
  </div>
</template>
