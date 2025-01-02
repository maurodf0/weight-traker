<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { ref, computed } from 'vue'
import useHeight from '@/composables/useHeight'
import HeightInput from '@/components/heightInput.vue'
import useSex from '@/composables/useSex'
import useActivity from '@/composables/useActivity'


const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleMode = () => {
  // Accediamo a mode.value per leggere e modificare la modalità
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

const  { height, submitHeight } = useHeight()

const { sex } = useSex()

const { activity } = useActivity()  

</script>


<template>
  <div>
      <h1>Settings</h1>

        <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Gender</h2>
        <p> Insert your gender for BMI and TDEE calculations</p>
        <div class="flex gap-4"> 
          <div class="input">
            <input type="radio" id="male" value="male" v-model="sex" class="mr-2">
            <label class=" dark:text-white" for="male">Male</label>
          </div>
          <div class="input">
            <input type="radio" id="female" value="female" v-model="sex" class="mr-2">
            <label class="dark:text-white" for="female">Female</label>
        </div>

        </div>
      </section>

        <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Activity</h2>
        <p>Insert your activity for BMI and TDEE calculations</p>
        <div class="flex gap-2 flex-col my-4"> 
          <div class="input">
            <input type="radio" id="sedentary" value="1.2" v-model="activity" class="mr-2">
            <label title="not active" class="dark:text-white" for="sedentary">Sedentary</label>
          </div>
          <div class="input">
            <input type="radio" id="lightlyActive" value="1.375" v-model="activity" class="mr-2">
            <label title="Low intensety training 1/3 days at week" class="dark:text-white" for="lightlyActive">Lightly Active</label>
          </div>
          <div class="input">
            <input type="radio" id="moderatelyActive" value="1.55" v-model="activity" class="mr-2">
            <label title="Moderate intensety training 2/3 days at week" class="dark:text-white" for="moderatelyActive">Moderately Active</label> 
            </div>
            <div class="input">
              <input type="radio" id="veryActive" value="1.725" v-model="activity" class="mr-2">
              <label title="Hight intensety training 4/5 days at week" class="dark:text-white" for="veryActive">Very Active</label>
            </div>
            <div class="input">
              <input type="radio" id="extremlyActive" value="1.9" v-model="activity" class="mr-2">
              <label title="Hight intensety training every day or 2 times a day" class="dark:text-white" for="veryActive">Extremly Active</label>
            </div>
        </div>
      </section>

      
      <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Height</h2>
        <p> Insert your height in cm for BMI and TDEE calculations</p>  
        <HeightInput v-model="height" class="mt-4" @heightHandle="submitHeight" />
      </section>
      
      <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Dark/Light Mode</h2>
        <button class="bg-slate-600 my-4 text-white py-2 px-4 rounded-lg" @click="toggleMode">
        Change Color Mode, current mode: {{ mode }}
        </button>
    </section>
    </div>
</template>

