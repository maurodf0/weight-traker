<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { ref, computed } from 'vue'
import useHeight from '@/composables/useHeight'
import HeightInput from '@/components/heightInput.vue'

const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleMode = () => {
  // Accediamo a mode.value per leggere e modificare la modalità
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

const  { height, submitHeight } = useHeight()



</script>


<template>
  <div>
      <h1>Settings</h1>

      <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-2xl font-bold dark:text-white">Dark/Light Mode</h2>
        <p>Current Mode: {{ mode.value }}</p>
        <button class="bg-slate-600 my-4 text-white py-2 px-4 rounded-lg" @click="toggleMode">
        Change Color Mode, current mode: {{ mode.value }}
        </button>
    </section>

    <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-2xl font-bold dark:text-white">Height</h2>
        <p> Insert your height in cm for BMI and TDEE calculations</p>  
        <HeightInput v-model="height" class="mt-4" @heightHandle="submitHeight" />
    </section>

  </div>
</template>

