<script setup lang="ts">
import { computed } from 'vue';

import useSex from '@/composables/useSex';
import useActivity from '@/composables/useActivity';
import useHeight from '@/composables/useHeight';
import useAge from '@/composables/useAge';
import useWeight from '@/composables/useWeight';

const { sex } = useSex();
const { activity } = useActivity();
const { height } = useHeight();
const { age } = useAge();
const { currentWeight } = useWeight();

const tdee = computed(() => {
  if (sex.value && activity.value && height.value && age.value && currentWeight.value) {
    const sexAsNumber = Number(sex.value);
    let REE = 0;

    if (sexAsNumber === 655.095) {
      // Donne
      REE = sexAsNumber + (9.563 * currentWeight.value) + (1.8496 * height.value) - (4.6756 * age.value);
    } else if (sexAsNumber === 66.473) {
      // Uomini
      REE = sexAsNumber + (13.7516 * currentWeight.value) + (5.0033 * height.value) - (6.7550 * age.value);
    } else {
      return 'Please enter valid sex to calculate your TDEE.';
    }

    return `${(REE * activity.value).toFixed(2)} kcal`;
  } else {
    return 'Please fill all fields to calculate your TDEE.';
  }
});
</script>


<template>
  <div class="max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-lg ">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">TDEE Calculator</h1>

    <div v-if="tdee" class="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
      <p class="text-lg text-gray-800 dark:text-gray-100 font-semibold">
        Your TDEE is: <span class="text-blue-500 dark:text-blue-400">{{ tdee }}</span>
      </p>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
        This is an estimation of your TDEE based on your sex, height, age, and activity. Eating this many calories will maintain your current weight.
      </p>
      <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <strong>Note:</strong> TDEE is calculated based on your sex, height, age, and activity level. The calculation may not be accurate for all scenarios. 
        Please consult a healthcare provider before making significant changes to your diet or exercise routine. 
        This estimate is not a replacement for medical advice.
      </p>
    </div>

    <div v-else class="bg-red-50 dark:bg-red-800 p-4 rounded-lg shadow-inner">
      <p class="text-red-700 dark:text-red-300">
        Please enter your sex, height, weight, age, and activity level in the settings to calculate your TDEE.
      </p>
    </div>
  </div>
</template>