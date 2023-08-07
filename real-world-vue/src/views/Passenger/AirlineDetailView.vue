<script setup lang="ts">
import type { PropType } from 'vue';
import { type Airline} from '@/type';
defineProps({
    airline: {
        type: Object as PropType<Airline>,
        required: true
    }
})
</script>

<template>
    <div v-if="airline">
        <p>Airline ID: {{ airline.id }}</p>
        <p>Airline Name: {{ airline.AirlineName }}</p>
        <br>
        <h5>Email: {{ airline.email }}</h5>
        <h5>Address: {{ airline.address }}</h5>


    </div>

</template>
