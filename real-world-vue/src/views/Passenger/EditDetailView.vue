<script setup lang="ts">
import { type Passenger } from '@/type';
import { type PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useMessangeStore } from '@/stores/message'; 
const props = defineProps({
    passengers: {
        type: Object as PropType<Passenger>,
            require: true
    }
})
const router = useRouter()
const store = useMessangeStore()
function edit(){
    store.updateMessage(' You are Edit successfully for '+props.passengers?.first_name)
    setTimeout(() =>{
        store.resetMessage()
    },5000)
    router.push({
        name: 'passenger-detail',
        params:{
            id: props.passengers?.id
        }
    })
}
</script>
<template>
    <p>Edit the Detaills here</p>
    <button @click="edit">Edit Me</button>
  </template>
