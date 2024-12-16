<script setup lang="ts">
 import { ref } from 'vue'

 const weight = ref<number>(0)
 const currentWeight = ref<number>(0)
 const allWeights = ref<Array<{ weight: number, date: Date }>>([])

 const submitForm = (e: Event) => {
   e.preventDefault()
   let newWeight = {
     weight: weight.value,
     date: new Date()
   }
   allWeights.value.push(newWeight)
   currentWeight.value = newWeight.weight
 }
</script>

<template>
  <h1 class="my-4 text-4xl mx-auto text-center">
    {{ currentWeight }} <span class="text-sm">/ kg</span>
  </h1>

  <form class="justify-center flex gap-2" @submit="submitForm">
    
    <input step="0.1" class="border-2 border-black rounded" type="number" id="weight" v-model="weight">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
  </form>


  <div v-if="allWeights.length > 0" class="m-4">
    <div class="flex justify-between">
     <h2 class="text-xl">Weights History</h2>
     <h5 class="text-gray-500 italic px-4 py-2 rounded">Latest 7 Days</h5>
    </div>
    <ul>
      <li class="bg-slate-200 even:bg-slate-300 py-1 px-2" v-for="w in allWeights">{{ w.weight }}</li>
    </ul>
  </div>

</template>

<style scoped>

</style>
