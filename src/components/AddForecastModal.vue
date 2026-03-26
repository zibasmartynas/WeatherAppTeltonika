<script setup>
import { ref } from 'vue'
import { useWeather } from '../composables/useWeather'

const emit = defineEmits(['close', 'add'])
const query = ref('')
const { fetchWeather } = useWeather()
const errorMsg = ref(null)

const searchWeather = async () => {
  let params = {}
  const value = query.value.trim()

  /*if (query.value.includes(',')) {
    const [lat, lon] = query.value.split(',')
    params = { lat, lon }
  } else if (/^[A-Za-z]{2}-\d+$/.test(value)) {
    const [country, zip] = value.split('-')
    params = { zip: `${zip},${country}` }
  } else if (/^\d+$/.test(value)) {
    params = { zip: `${value},LT` }
  } else if (!isNaN(query.value)) {
    params = { zip: query.value }
  } else {
    params = { q: query.value }
  }*/

  if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(value)) {
    const [lat, lon] = value.split(',')
    params = { lat, lon }

  } else if (/^\d+,[A-Za-z]{2}$/.test(value)) {
    // 04322,LT
    params = { zip: value }

  } else if (/^[A-Za-z]{2}-\d+$/.test(value)) {
    // LT-04322
    const [country, zip] = value.split('-')
    params = { zip: `${zip},${country}` }

  } else {
    params = { q: value }
  }

  console.log('Sending params:', params)

  const { data, error } = await fetchWeather(params)

  if (error) {
    errorMsg.value = 'Failed to fetch weather'
    emit('notify', {
      type: 'is-danger',
      message: 'Failed to fetch weather'
    })
  } else {
    emit('add', data)
    emit('close')
  }
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('close')"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Forecast</p>
      </header>

      <section class="modal-card-body">
        <input class="input" v-model="query" placeholder="City / ZIP / lat,lon" />
        <p class="has-text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" @click="searchWeather">Search</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </footer>
    </div>
  </div>
</template>