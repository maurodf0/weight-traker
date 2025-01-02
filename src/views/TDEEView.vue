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
    return (sex.value === 'male' ? 1.2 : 1.55) * activity.value * height.value;
  }
  return null;
});

uomini: MB = 66,4730 + (13,7516 x peso in kg) + (5,0033 x statura in cm) – (6,7550 x età in anni)
donne: MB = 655,0955 + (9,5634 x peso in kg) + (1,8496 x statura in cm) – (4,6756 x età in anni)
             

</script>

<template>
    <div>
        <h1>TDEE</h1>
        <p>Your TDEE is: {{ tdee }}</p>

    </div>
</template>