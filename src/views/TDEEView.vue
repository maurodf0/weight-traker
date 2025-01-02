<script setup lang="ts">

import { computed } from 'vue'

import useSex from '@/composables/useSex'
import useActivity from '@/composables/useActivity'
import useHeight from '@/composables/useHeight'
import useAge from '@/composables/useAge'

const { sex } = useSex()
const { activity } = useActivity()  
const { height } = useHeight()
const { age } = useAge()

const tdee = computed(() => {
  if (sex.value && activity.value && height.value) {
    const sexAsNumber = Number(sex.value);
    if (sexAsNumber === 66.4730) {
        return (sexAsNumber + (9.5634 * height.value) + (1.8496 * height.value) - (4.6756 * age.value)).toFixed(2) + ' kcal';
    } else if (sexAsNumber === 655.0955) {
        return (sexAsNumber + (13.7516 * height.value) + (5.0033 * height.value) - (6.7550 * age.value)).toFixed(2) + ' kcal';
    } else {
        return ' Please enter your sex and height to calculate your TDEE';
    }
  }
})


</script>

<template>
    <div>
        <h1>TDEE</h1>
        <p v-if="tdee">Your TDEE is: {{ tdee }}</p>
        <p v-else>Please enter your sex, height and age in the settings to calculate your TDEE</p>
    
    </div>
</template>