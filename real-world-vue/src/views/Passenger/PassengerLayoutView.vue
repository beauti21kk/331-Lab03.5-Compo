<script setup lang="ts">
import { ref } from 'vue'
import { type Airline, type Passenger } from '@/type'
import PassengerService from '@/services/PassengerService'
import { useRouter } from 'vue-router'
const passenger = ref<Passenger | null>(null)
const airline = ref<Airline | null>(null)
const props = defineProps({
  id: String
})
const router = useRouter()
PassengerService.getPassengerById(Number(props.id))
  .then((response) => {
    passenger.value = response.data
    //////// ไม่เข้าใจ ไอ่โยแก้ให้
    PassengerService.getAirlineById(Number(passenger.value.airlineId))
      .then((response) => {
        airline.value = response.data
      })
      .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 404) {
          router.push({ name: '404-resource', params: { resource: 'Airline' } })
        } else {
          router.push({ name: 'network-error' })
        }
      })
      ///////
  })
  .catch((error) => {
    console.log(error)
    if (error.response && error.response.status === 404) {
      router.push({ name: '404-resource', params: { resource: 'Passenger' } })
    } else {
      router.push({ name: 'network-error' })
    }
  })
</script>

<template>
  <div v-if="passenger">
    <div id="nav">
      <router-link :to="{ name: 'passenger-detail', params: { id } }">Passenger-Detail</router-link>
      |
      <router-link :to="{ name: 'airline-detail', params: { id } }">Airline-Detail</router-link>
    </div>

    <RouterView :passenger="passenger" :airline="airline"></RouterView>
  </div>
</template>
