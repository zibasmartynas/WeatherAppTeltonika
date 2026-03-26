<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps(['forecasts'])
const emit = defineEmits(['remove'])

const currentPage = ref(1)
const perPage = 10

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const slice = props.forecasts.slice(start, start + perPage)

  while (slice.length < perPage) {
    slice.push(null)
  }

  return slice
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value

  const delta = 2

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  const pages = []

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const totalPages = computed(() =>
  Math.ceil(props.forecasts.length / perPage)
)

const getIcon = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

watch(
  () => props.forecasts.length,
  () => {
    const maxPage = Math.max(1, Math.ceil(props.forecasts.length / perPage))

    if (currentPage.value > maxPage) {
      currentPage.value = maxPage
    }
  }
)
</script>

<template>
  <table class="table is-fullwidth is-striped">
    <thead>
      <tr>
        <th></th>
        <th>City</th>
        <th>Temp</th>
        <th>Humidity</th>
        <th>Wind</th>
        <th>Pressure</th>
        <th>Sunrise</th>
        <th>Sunset</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(f, i) in paginated" :key="i">

        <template v-if="f">

        <td><img :src="getIcon(f.weather[0].icon)" alt="weather icon" width="26" /></td> 
        <td>{{ f.name }}, {{ f.sys.country }}</td>
        <td>{{ f.main.temp }} °C</td>
        <td>{{ f.main.humidity }}%</td>
        <td>{{ f.wind.speed }} m/s</td>
        <td>{{ f.main.pressure }}</td>
        <td>{{ new Date(f.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second:'2-digit', hour12: false}) }}</td>
        <td>{{ new Date(f.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',second:'2-digit', hour12: false}) }}</td>
        <td>
          <button class="button is-small is-danger" @click="emit('remove', f.id)">
            ✕
          </button>
        </td>

        </template>
        <template v-else> <td colspan="9">&nbsp;</td> </template>


      </tr>
    </tbody>
  </table>

  <nav class="pagination is-centered mt-4" role="navigation">
  
  <a
  class="pagination-previous"
  :class="{ 'is-disabled': currentPage === 1 }"
  @click="currentPage > 1 && currentPage--"
>
  Prev
</a>

<a
  class="pagination-next"
  :class="{ 'is-disabled': currentPage === totalPages || totalPages === 0 }"
  @click="currentPage < totalPages && currentPage++"
>
  Next
</a>

  <ul class="pagination-list">

      <li v-if="visiblePages[0] > 1">
        <a class="pagination-link" @click="currentPage = 1">1</a>
      </li>

      <li v-if="visiblePages[0] > 2">
        <span class="pagination-ellipsis">…</span>
      </li>

      <li v-for="page in visiblePages" :key="page">
        <a
          class="pagination-link"
          :class="{ 'is-current': currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </a>
      </li>

    <li v-if="visiblePages[visiblePages.length - 1] < totalPages - 1">
      <span class="pagination-ellipsis">…</span>
    </li>

    <li v-if="visiblePages[visiblePages.length - 1] < totalPages">
      <a
        class="pagination-link"
        @click="currentPage = totalPages"
      >
        {{ totalPages }}
      </a>
    </li>
  </ul>

</nav>
</template>