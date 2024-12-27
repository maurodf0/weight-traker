<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
</script>

<template>
   <main class="bg-orange-50 min-h-screen p-6">
    <AppHeader />
    <RouterView />
  </main>
</template>