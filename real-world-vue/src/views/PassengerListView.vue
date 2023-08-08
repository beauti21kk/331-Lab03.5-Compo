<template>
    <main class="events">
        <h1>Sawasdee Ka, Sai Kan Bin Ya Chee Na Nat Yin Dee Ton Rub</h1>
        <br>
        <PassengerCard v-for="passenger in passengers" :key="passenger.id" :passenger="passenger"></PassengerCard>
        <RouterLink :to="{ name: 'PassengerList', query:{ page: page + 1}}" rel="prev" 
          v-if = "hasNextPage" id="page-next"> Next Page
        </RouterLink>
        <RouterLink :to="{ name: 'PassengerList', query:{ page: page - 1}}" rel="prev" 
          v-if = "page != 1" id="page-prev"> Prev Page
        </RouterLink>

    </main>
</template>

<script setup lang="ts">
import PassengerCard from '@/components/PassengerCard.vue';
import type { Airline, Passenger } from '@/type';
import PassengerService from '@/services/PassengerService';
import {ref, type Ref, watchEffect, computed, } from 'vue'
import type { Axios, AxiosResponse } from 'axios';
import router from '@/router';

const passengers: Ref<Array<Passenger>> = ref([])
const totalPassenger = ref<number>(0)
// const airlines: Ref<Array<Airline>> = ref([])
// const totalAirline = ref<number>(0)
const props = defineProps({
    page:{
        type: Number,
        required: true
    },
})
watchEffect(() =>{
    PassengerService.getPassenger(4, props.page).then((response: AxiosResponse<Passenger[]>) =>{
        passengers.value = response.data
        totalPassenger.value = response.headers['x-total-count']
    })
    // PassengerService.getAirline(4, props.page).then((response: AxiosResponse<Airline[]>) =>{
    //     airlines.value = response.data
    //     totalAirline.value = response.headers['x-total-count']
    // })
})
const hasNextPage = computed(()=>{
    const totalPages = Math.ceil(totalPassenger.value/2)
    //  && Math.ceil(totalAirline.value/2)
    return props.page.valueOf() < totalPages
    
})
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
