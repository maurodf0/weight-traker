<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { ref, computed } from 'vue'

const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleMode = () => {
  // Accediamo a mode.value per leggere e modificare la modalità
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}


</script>


<template>
  <div>
    <h1>Settings</h1>
    <p>Current Mode: {{ mode.value }}</p>
    <button class="bg-slate-600 my-4 text-white py-2 px-4 rounded-lg" @click="toggleMode">
      Change Color Mode, current mode: {{ mode.value }}
    </button>

    <h2>Height</h2>
       <HeightInput class="mt-10" @heightHandle="submitHeight" />
    <h4 class="text-2xl font-bold text-center text-gray-600">{{ BMIMessage }}</h4>

  </div>
</template>

