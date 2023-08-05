<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref } from 'vue'
import type { Ref } from 'vue'
import eventService from '@/services/EventService'
 
const events: Ref<Array<EventItem>> = ref([])
  eventService.getEvent().then((response) => {
    events.value = response.data
  })
  
</script>

<template>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
  </main>
</template>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}</style>