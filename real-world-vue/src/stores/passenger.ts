import type { Passenger, Airline } from "@/type";
import { defineStore } from "pinia";
export const usePassengerStore = defineStore('passenger',{
    state: () => ({
        passenger: null as Passenger | null,
        airline: null as Airline | null
    }),
    actions: {
        setPassenger(passenger: Passenger) {
            this.passenger = passenger
        },
        setAirline(airline: Airline){
            this.airline = airline
        }
    }
})
