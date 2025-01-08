<script setup lang="ts">

import useCalculations from '@/composables/useCalculations'
import useTracker from '@/composables/useTracker'
import { computed, watch } from 'vue'
const { bmi } = useCalculations()
const { setBMI } = useTracker();


    import { ref } from "vue";
    import {
        VueDataUi,
        type VueUiGaugeDataset, 
        type VueUiGaugeConfig 
    } from "vue-data-ui";
    import "vue-data-ui/style.css";
    
    
    const dataset = ref<VueUiGaugeDataset>();
    const config = ref<VueUiGaugeConfig>();

const BMIMessage = computed(() => {
  const bmiNumber = bmi ? parseFloat(bmi.value) : null;
  if (bmiNumber) {
    if (bmiNumber < 18.5) {
      return 'You are Underweight';
    } else if (bmiNumber < 25) {
      return 'You are Normal';
    } else if (bmiNumber < 30) {
      return 'You are Overweight';
    } else {
      return 'You are Obese';
    }
  }
  return null;
});


watch(bmi, () => {
  setBMI(bmi.value); 
});


</script>

<template>

  

  <div class="max-w-md mx-auto my-8 p-6 dark:bg-gray-800 rounded-lg">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">BMI Calculator</h1>

    <div v-if="bmi" class="p-4 bg-white dark:bg-slate-700 rounded-md shadow">
      <p class="text-lg font-semibold text-gray-800 dark:text-gray-100">

    <VueDataUi
        component="VueUiGauge"
        :dataset="dataset"
        :config="config"
    />

        Your BMI is: <span class="text-blue-600 dark:text-blue-400">{{ bmi }}</span>
      </p>
      <p class="mt-2 text-gray-700 dark:text-gray-300">{{ BMIMessage }}</p>

      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
        This is an estimation of your BMI based on your sex, height, and weight.
      </p>
      <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <strong>Note:</strong> BMI is calculated based on your sex, height, and weight. The calculation may not be accurate for all scenarios. 
        Please consult a healthcare provider before making significant changes to your diet or exercise routine. 
        This estimate is not a replacement for medical advice.
        N.B: BMI is an estimation and not consider a lot of factors that can affect your health, like, for example, muscle mass.
      </p>
    </div>

    <div v-else class="p-4 bg-red-100 dark:bg-red-800 rounded-md shadow">
      <p class="text-red-700 dark:text-red-300">
        Please enter your height and weight to calculate your BMI.
      </p>
    </div>
  </div>
</template>