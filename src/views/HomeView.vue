<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick, shallowRef } from 'vue'
import Chart from 'chart.js/auto';
import NumberAnimation from "vue-number-animation";
import 'chartjs-adapter-date-fns';

const weightChart = shallowRef(null)
const message = ref<string | null>(null)
const difference = ref<number | null>(null)
const weightChartEl = ref<HTMLCanvasElement | null>(null)

const weightInput = ref<number | null>(null)
const allWeights = ref<Array<{ weight: number, date: Date }>>([])

// Italian date format
const localeIT = "it-IT"
const optionsIT = { weekday: "short", year: "numeric", month: "short", day: "numeric" }

onMounted(() => {
  const storedWeights = localStorage.getItem('allWeights')
  if (storedWeights) {
    allWeights.value = JSON.parse(storedWeights).map((w: { weight: number; date: string }) => ({
      weight: w.weight,
      date: new Date(w.date)
    }));
  }

  const storedMessage = localStorage.getItem('message')
  if (storedMessage) {
    message.value = storedMessage
  }

  nextTick(() => {
    weightChart.value = new Chart(weightChartEl.value!.getContext('2d')!, {
      type: 'line',
      data: {
        labels: allWeights.value
          .slice()  // Crea una copia dell'array per non modificarlo direttamente
          .sort((a, b) => b.date.getTime() - a.date.getTime())  // Ordina per data decrescente
          .map(w => w.date.toLocaleDateString(localeIT, optionsIT))  // Estrai le etichette delle date
          .slice(0, 7),  // Limita ai 7 valori più recenti
        datasets: [{
          label: 'Weight',
          data: allWeights.value
            .slice()  // Crea una copia dell'array per non modificarlo direttamente
            .sort((a, b) => b.date.getTime() - a.date.getTime())  // Ordina per data decrescente
            .map(w => w.weight)  // Estrai i valori dei pesi
            .slice(0, 7),  // Limita ai 7 valori più recenti
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: 'rgb(75, 192, 192)',
          pointHoverBackgroundColor: 'rgb(75, 192, 192)',
          pointHoverBorderColor: 'rgb(220,220,220)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            reverse: true,  // Inverte l'asse X per fare in modo che i valori recenti siano sulla destra
          }
        }
      }
    })
  })
})

const sortedWeight = computed(() => {
  return [...allWeights.value].sort((a, b) => b.date.getTime() - a.date.getTime());
});

const currentWeight = computed(() => {
  return sortedWeight.value.length > 0 ? sortedWeight.value[0].weight : 0;
});

watch(currentWeight, (newCurrentWeight, currentWeight) => {
  if (currentWeight == 0 || newCurrentWeight == 0) {
    message.value = ``;
    return;
  }
  difference.value = newCurrentWeight - currentWeight;
  if (difference.value > 0) {
    message.value = `You've gained ${difference.value.toFixed(1)} kg`;
  } else {
    message.value = `You've lost ${-difference.value} kg`;
  }
  localStorage.setItem('message', message.value);
});

watch(allWeights, (newWeights) => {
  localStorage.setItem('allWeights', JSON.stringify(newWeights));

  if (weightChart.value && weightChart.value.data && weightChart.value.data.datasets && weightChart.value.data.datasets[0]) {
    weightChart.value.data.labels = newWeights
      .slice()  // Crea una copia dell'array per non modificarlo direttamente
      .sort((a, b) => b.date.getTime() - a.date.getTime())  // Ordina per data decrescente
      .map(w => w.date.toLocaleDateString(localeIT, optionsIT))  // Estrai le etichette delle date
      .slice(0, 7);  // Limita ai 7 valori più recenti

    weightChart.value.data.datasets[0].data = newWeights
      .slice()  // Crea una copia dell'array per non modificarlo direttamente
      .sort((a, b) => b.date.getTime() - a.date.getTime())  // Ordina per data decrescente
      .map(w => w.weight)  // Estrai i valori dei pesi
      .slice(0, 7);  // Limita ai 7 valori più recenti

    weightChart.value.options.scales.x.reverse = true;  // Assicura che i valori recenti siano sulla destra
    weightChart.value.update();
  } else {
    console.error('weightChart structure is not defined as expected', weightChart.value);
  }
}, { deep: true })

const submitForm = (e: Event) => {
  if (!weightInput.value) {
    alert('Please enter a weight')
    weightInput.value = null;
    return;
  } else if (weightInput.value < 0) {
    alert('Weight cannot be negative')
    weightInput.value = null;
    return;
  }
  let newWeight = {
    weight: weightInput.value,
    date: new Date()
  }
  allWeights.value.push(newWeight)
  weightInput.value = null;
}

const handleDelete = (date: Date) => {
  allWeights.value = allWeights.value.filter(w => w.date !== date)
}

</script>

<template>
    <div>    <NumberAnimation 
      class="text-center text-4xl font-bold text-blue-600"
      :class="!message ? 'my-4' : 'my-0' "
      ref="currentWeight"
      :from="0"
      tag="h1"
      :to="currentWeight"
      :format="weight => weight.toFixed(1) + ' kg'"
      :duration=".5"
      autoplay
      easing="linear"
/>

    <h4 
      class="text-center text-lg mb-4 text-gray-600"
      v-if="message"
      :class="difference < 0 ? 'text-green-400' : 'text-red-400' ">{{ message }}</h4>

    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <input step="0.1" 
             class="px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg"
             type="number"
             id="weight" 
             v-model="weightInput"
             placeholder="Enter your weight">
      <button class="bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600" type="submit">
        Submit
      </button>
    </form>

    <div class="chartContainer mt-6" v-if="allWeights.length > 0">
      <h2 class="text-xl font-semibold text-gray-700 dark:text-white">Weights History</h2>
      <canvas ref="weightChartEl"></canvas>
    </div>

    <div v-if="sortedWeight.length > 0" class="mt-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-700  dark:text-white">Weights History</h2>
        <h5 class="text-gray-500 italic px-4 py-2 rounded">Latest</h5>
      </div>
      <ul v-auto-animate>
        <li class="flex justify-between items-center bg-gray-100 dark:bg-gray-500 dark:even:bg-gray-600 even:bg-gray-200 py-2 px-4 rounded mb-2"
            v-for="w in sortedWeight.slice(0, 7)"
            :key="w.date.toString()">
          <span>{{ w.weight }} <span class="text-sm">Kg</span> - 
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ w.date.toLocaleDateString(localeIT, optionsIT) }}</span>
          </span>
          <span @click="handleDelete(w.date)" class="text-red-600 cursor-pointer">X</span>
        </li>
    </ul>

    </div>

    <div  v-else class="mt-6">
      <p class="text-center text-gray-500">No weights yet. Add your first weight and start your journey.</p>
    </div>

</div>



</template>

