<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main>
    <section class="max-w-md mx-auto bg-white p-4 rounded-lg">
      <RouterView />
    </section>
  </main>
</template>