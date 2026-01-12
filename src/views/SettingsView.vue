<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { ref, computed } from 'vue'
import useHeight from '@/composables/useHeight'
import HeightInput from '@/components/heightInput.vue'
import useSex from '@/composables/useSex'
import useActivity from '@/composables/useActivity'
import useAge from '@/composables/useAge'

const mode = useColorMode() // Ref<'dark' | 'light'>

const toggleMode = () => {
  // Accediamo a mode.value per leggere e modificare la modalità
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
  
}

const  { height, submitHeight } = useHeight()
const { age, submitAge } = useAge()
const { sex, submitSex} = useSex()
const { activity, submitActivity, activityOptions } = useActivity()


</script>


<template>
  <div>
      <h1>Settings</h1>

        <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
          <h2 class="text-xl font-bold dark:text-white">Gender</h2>
          <p> Insert your gender for BMI and TDEE calculations</p>
          <form class="flex flex-col gap-4" @submit.prevent="submitSex(sex)">
            <div class="flex gap-4"> 
              <div class="input">
                <input type="radio" id="male" value="66.4730" v-model="sex" class="mr-2">
                <label class=" dark:text-white" for="male">Male</label>
              </div>
              <div class="input">
                <input type="radio" id="female" value="655.0955" v-model="sex" class="mr-2">
                <label class="dark:text-white" for="female">Female</label>
            </div>
          </div>
          <input type="submit" value="Submit" class="bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-slate-600">
            </form>

        
      </section>

           <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
            <h2 class="text-xl font-bold dark:text-white">Age</h2>
            <p> Insert your age for TDEE calculations</p>
          
              <form class="flex flex-col gap-4" @submit.prevent="submitAge">
              <input 
                v-model="age"
                step="0.1" 
                class="px-4 py-2 border border-gray-300 focus:border-slate-500 focus:ring focus:ring-blue-200 rounded-lg"
                type="number"
                id="age" 
                placeholder="Enter your age">
              <input type="submit" value="Submit" class="bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-slate-600">
              </form>
          </section>

        <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Activity</h2>
        <p>Insert your activity for BMI and TDEE calculations</p>
        <div class="flex gap-2 flex-col my-4">
          <form class="flex flex-col gap-4" @submit.prevent="submitActivity(activity)">
          <div class="input">
            <input type="radio" id="sedentary" value="1.2" v-model="activity" class="mr-2">
            <label title="not active: no workout and no exercise, walk less than 4000 steps day" class="dark:text-white" for="sedentary">Sedentary</label>
          </div>
          <div class="input">
            <input type="radio" id="lightlyActive" value="1.375" v-model="activity" class="mr-2">
            <label title="Training 1 to 3 days at week, walk less than 8000 steps day" class="dark:text-white" for="lightlyActive">Lightly Active</label>
          </div>
          <div class="input">
            <input type="radio" id="moderatelyActive" value="1.55" v-model="activity" class="mr-2">
            <label title="Training 3 to 4 days at week, from 8000 to 12000 steps day" class="dark:text-white" for="moderatelyActive">Moderately Active</label> 
            </div>
            <div class="input">
              <input type="radio" id="veryActive" value="1.725" v-model="activity" class="mr-2">
              <label title="Training 5 days at week, from 12000 to 16000 steps day" class="dark:text-white" for="veryActive">Very Active</label>
            </div>
            <div class="input">
              <input type="radio" id="extremlyActive" value="1.9" v-model="activity" class="mr-2">
              <label title="Training 6 days at week or more" class="dark:text-white" for="extremlyActive">Extremly Active</label>
            </div>
            <input type="submit" value="Submit" class="bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-slate-600">
          </form>
        </div>
      </section>

      
      <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Height</h2>
        <p> Insert your height in cm for BMI and TDEE calculations</p>  
        <HeightInput class="mt-4" @heightHandle="submitHeight" />
      </section>
      
      <section class="wrapper my-4 bg-white dark:bg-slate-700 p-4 rounded-lg">
        <h2 class="text-xl font-bold dark:text-white">Dark/Light Mode</h2>
        <button class="bg-slate-600 my-4 text-white py-2 px-4 rounded-lg" @click="toggleMode">
        Change Color Mode, current mode: {{ mode }}
        </button>
    </section>
    </div>
</template>

