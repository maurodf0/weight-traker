<script setup lang="ts">
 import { ref } from 'vue'

 const weightInput = ref<number>(0)
 const currentWeight = ref<number>(0)
 const allWeights = ref<Array<{ weight: number, date: Date }>>([])

 // Italian date format
const localeIT = "it-IT"
const optionsIT = { weekday:"long", year: "numeric", month: "long", day: "numeric" }

 const submitForm = (e: Event) => {
   if(!weight.value) {
     alert('Please enter a weight')
    return;
   }
   let newWeight = {
     weight: weight.value,
     date: new Date()
   }
   allWeights.value.unshift(newWeight)
   currentWeight.value = newWeight.weight
   weight.value = null;
 }

  const handleDelete = (date: Date) => {
  allWeights.value = allWeights.value.filter(w => w.date !== date)
 }
</script>

<template>
  <h1 class="my-4 text-4xl mx-auto text-center">
    {{ allWeights.length === 0 ? 0 : currentWeight }} <span class="text-sm">/ kg</span>
  </h1>

  <form class="justify-center flex gap-2" @submit.prevent="submitForm">
    
    <input step="0.1" 
          class="px-2 border border-grey-800 :focus:border-black rounded-lg"
          type="number"
          id="weight" 
          v-model="weightInput"
          placeholder="Enter your weight"
    >
    <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
  </form>

  <div class="chartContainer" v-if="allWeights.length >0">
    <canvas id="myChart"></canvas>
  </div>


  <div v-if="allWeights.length > 0" class="m-4">
    <div class="flex justify-between">
     <h2 class="text-xl">Weights History</h2>
     <h5 class="text-gray-500 italic px-4 py-2 rounded">Latests</h5>
    </div>
    <ul>
      <li class=" flex justify-between bg-slate-200 even:bg-slate-300 py-1 px-2" 
          v-for="w in allWeights.slice(-7)"
          :key="w.date.toString()"><span>{{ w.weight }} - 
            <span class="text-sm text-gray-500">{{ w.date.toLocaleDateString(localeIT, optionsIT) }}</span>
           </span>
          <span @click="handleDelete(w.date)" class="text-red-600">X</span>
        </li>
    </ul>
  </div>

</template>

<style scoped>

</style>
