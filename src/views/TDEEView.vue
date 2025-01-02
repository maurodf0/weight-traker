<script setup lang="ts">

import { computed } from 'vue'

import useSex from '@/composables/useSex'
import useActivity from '@/composables/useActivity'
import useHeight from '@/composables/useHeight'

const { sex } = useSex()
const { activity } = useActivity()  
const { height } = useHeight()

             

</script>

<template>
    <div>
        <h1>TDEE</h1>
        <p>Your TDEE is: {{ tdeeMaleModeratelyActive }}</p>
    </div>
</template>