<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main>
    <section class="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg">
      <RouterView />
    </section>
  </main>
</template>

<style>
  body {
    background-color: #f3f4f6;
  }

  .dark body {
    background-color: #1a202c;
  }

  .dark main p {
    color: #f3f4f6;
  }

  h1 {
    @apply text-3xl font-bold dark:text-white
  }
  </style>