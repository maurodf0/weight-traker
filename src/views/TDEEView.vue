<script setup lang="ts">

import { computed } from 'vue'

import useSex from '@/composables/useSex'
import useActivity from '@/composables/useActivity'
import useHeight from '@/composables/useHeight'

const { sex } = useSex()
const { activity } = useActivity()  
const { height } = useHeight()

const tdee = computed(() => {
  if (sex.value && activity.value && height.value) {
    // Sex: MB = 66,4730 + (13,7516 x peso in kg) + (5,0033 x statura in cm) – (6,7550 x età in anni)
    // Donne: MB = 655,0955 + (9,5634 x peso in kg) + (1,8496 x statura in cm) – (4,6756 x età in anni)
    if (sex.value === 66.4730) {
        return (sex.value + (9.5634 * height.value) + (1.8496 * height.value) - (4.6756 * age.value)).toFixed(2);
    } else if (sex.value === 655.0955) {
        return (sex.value + (13.7516 * height.value) + (5.0033 * height.value) - (6.7550 * age.value)).toFixed(2);
    }
  }
})


</script>

<template>
    <div>
        <h1>TDEE</h1>
        <p>Your TDEE is: {{ tdee }}</p>

    </div>
</template>