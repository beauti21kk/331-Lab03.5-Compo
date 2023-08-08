<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePassengerStore } from '@/stores/passenger'
import { storeToRefs } from 'pinia'

const store = usePassengerStore()
const { passenger, airline } = storeToRefs(store)
const id = ref(passenger.value?.id)

</script>

<template>
  <div v-if="passenger">
    <div id="nav">
      <router-link :to="{ name: 'passenger-detail', params: { id } }">Passenger-Detail</router-link>
      |
      <router-link :to="{ name: 'airline-detail', params: { id } }">Airline-Detail</router-link>
      |
      <router-link :to="{ name: 'edit-detail', params: { id } }">Edit</router-link>
    </div>

    <RouterView :passenger="passenger" :airline="airline"></RouterView>
  </div>
</template>
