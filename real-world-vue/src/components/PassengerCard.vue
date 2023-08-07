<template>
    <RouterLink class="event-link" :to="{name: 'passenger-detail', params: {id: passenger?.id}}">
        <div class="event-card">
            <span>ID: {{ passenger?.id }}</span>
            <h2>Name: {{ passenger?.first_name }}  {{ passenger?.last_name }}</h2>
            <h3>Gender: {{ passenger?.gender }}</h3>
            <h4>Email: {{ passenger?.email }}</h4>
        </div>
    </RouterLink>
</template>
<script setup lang="ts">
import type { Passenger } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
    passenger: {
        type: Object as PropType<Passenger>,
        require: true    
    }
})
</script>
<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12 px 0 rgba(0, 0, 0, 0.2);
}
.event-link {
  color: #39495c;
  text-decoration: none;
}
</style>
