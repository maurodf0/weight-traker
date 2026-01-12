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
  
    

    const config = ref({"responsive":false,"theme":"","customPalette":[],"style":{"fontFamily":"inherit","chart":{"backgroundColor":"#ffffff00","color":"#1A1A1Aff","animation":{"use":true,"speed":"1","acceleration":1},"layout":{"radiusRatio":1,"track":{"size":1,"useGradient":false,"gradientIntensity":"13"},"markers":{"show":true,"color":"#1A1A1Aff","bold":true,"fontSizeRatio":1,"offsetY":0,"roundingValue":0,"formatter":null,"prefix":"","suffix":""},"segmentSeparators":{"show":false,"offsetOut":0,"offsetIn":0,"stroke":"#1A1A1Aff","strokeWidth":1},"segmentNames":{"show":true,"curved":true,"offsetRatio":"1.12","fontSize":16,"useSerieColor":true,"color":"#1A1A1Aff","bold":false},"pointer":{"type":"rounded","size":1,"stroke":"#1a1a1a00","strokeWidth":19,"useRatingColor":true,"color":"#CCCCCCff","circle":{"radius":19,"stroke":"#1a1a1a00","strokeWidth":12,"color":"#FFFFFFff"}}},"legend":{"show":true,"fontSize":48,"prefix":"","suffix":"","roundingValue":1,"showPlusSymbol":true,"useRatingColor":true,"color":"#1A1A1Aff","formatter":null},"title":{"text":"BMI","color":"#1A1A1Aff","fontSize":20,"bold":true,"textAlign":"center","paddingLeft":0,"paddingRight":0,"subtitle":{"color":"#A1A1A1ff","text":"","fontSize":16,"bold":false}}}},"userOptions":{"show":false,"showOnChartHover":false,"keepStateOnChartLeave":true,"position":"right","buttons":{"tooltip":false,"pdf":false,"csv":false,"img":false,"table":false,"labels":false,"fullscreen":false,"sort":false,"stack":false,"animation":false,"annotator":false},"buttonTitles":{"open":"Open options","close":"Close options","pdf":"Download PDF","img":"Download PNG","fullscreen":"Toggle fullscreen","annotator":"Toggle annotator"}},"translations":{"base":"Base"}})
    
    const dataset = computed(() => ({
    value: bmi.value ? Number(bmi.value) : Number(localStorage.getItem('bmi') || 0),
    series: [
        {
            from: 0,
            to: 18,
            color: "#F87907",
            name: 'underweight'
        },
        {
            from: 18.5,
            to: 24.9,
            color: "#42d392",
            name: 'healthy'
        },
        {
            from: 25,
            to: 29.9,
            color: "#F87907",
            name: 'overweight'
        },
        {
            from: 30,
            to: 39.9,
            color: "#F32013",
            name: 'obese'
        },
        {
            from: 40,
            to: 50,
            color: "#CA0B00",
            name: 'severe obesity'
        }
    ]
}));

console.log(dataset.value)

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