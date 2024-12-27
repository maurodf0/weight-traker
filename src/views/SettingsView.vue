<template>
  <div>
    <h1>Settings</h1>
    <p>Current Mode: {{ mode.value }}</p>
    <button class="bg-slate-600 my-4 text-white py-2 px-4 rounded-lg" @click="toggleMode">
      Change Color Mode, current mode: {{ mode.value }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleMode = () => {
  // Accediamo a mode.value per leggere e modificare la modalità
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}
</script>
