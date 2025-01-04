import { ref, watch, onMounted, watchEffect } from 'vue';

const weight = ref<string | null>(null);
const tdee = ref<string | null>(null);
const bmi = ref<string | null>(null);

watchEffect(() => {
  weight.value = localStorage.getItem('weight');
  tdee.value = localStorage.getItem('tdee');
  bmi.value = localStorage.getItem('bmi');
});

watch(weight, () => {
  localStorage.setItem('weight', weight.value);
});

watch(tdee, () => {
  localStorage.setItem('tdee', tdee.value);
});

watch(bmi, () => {
  localStorage.setItem('bmi', bmi.value);
});     

onMounted(() => {
  const storedWeight = localStorage.getItem('weight');
  if (storedWeight) {
    weight.value = storedWeight;
  }

  const storedTDEE = localStorage.getItem('tdee');
  if (storedTDEE) {
    tdee.value = storedTDEE;
  }

  const storedBMI = localStorage.getItem('bmi');
  if (storedBMI) {
    bmi.value = storedBMI;
  }
});

export default function useTracker() {
  return {
    weight,
    tdee,
    bmi,
    setWeight(value: string) {
      weight.value = value;
      console.log(weight.value);
    },
    setTDEE(value: string) {
      tdee.value = value;
      console.log(tdee.value);
    },
    setBMI(value: string) {
      bmi.value = value;
    },
  };
}