<script setup lang="ts">
import type { PropType } from 'vue'
import { type Passenger } from '@/type'
defineProps({
  passenger: {
    type: Object as PropType<Passenger>,
    require: true
  }
})
</script>

<template>
  <div v-if="passenger">
    <p>ID: {{ passenger.id }}</p>
    <p>Name: {{ passenger.first_name }} {{ passenger.last_name }}</p>
    <p>Gender: {{ passenger.gender }}</p>
    <p>Travel Date: {{ passenger.travelDate }}</p>
    <br />
    <h5>Email: {{ passenger.email }}</h5>
    <h5>IP Address: {{ passenger.ip_address }}</h5>
    <h5>Source: {{ passenger.Source }}</h5>
    <h5>Destination: {{ passenger.Destination }}</h5>
  </div>
</template>
