import { ref } from 'vue';

const weight = ref<string | null>(null);
const tdee = ref<string | null>(null);
const bmi = ref<string | null>(null);

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