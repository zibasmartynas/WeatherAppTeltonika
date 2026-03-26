<script setup>
defineProps(['data'])
</script>

<template>
  <div class="notification" :class="data.type">
    {{ data.message }}
  </div>
</template>