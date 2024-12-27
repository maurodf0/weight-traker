<template>
  <div>
    <h1>Settings</h1>
    <p>Current Mode: {{ mode.value }}</p>
    <button @click="toggleMode">
      Toggle Mode
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
