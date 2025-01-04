<script setup lang="ts">
import InfoCard from '@/components/InfoCard.vue';
import useTracker from '@/composables/useTracker';
import useCalculations from '@/composables/useCalculations';

const { weight } = useTracker();

const { tdee, bmi } = useCalculations();
</script>

<template>
  <div class="max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your Recap Tracked</h1>
    <div class="flex flex-col gap-4">
      <RouterLink to="/weight">
        <InfoCard :info="weight" description="Weight" suffix="kg" />
      </RouterLink>
      <RouterLink to="/bmi">
        <InfoCard :info="bmi" description="BMI"   />
      </RouterLink>
      <RouterLink to="/tdee">
        <InfoCard :info="tdee" description="TDEE" suffix="Kcal/day" />
      </RouterLink>
    </div>
  </div>

</template> 