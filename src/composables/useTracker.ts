import { ref } from 'vue';

const weight = ref<string | null>(null);
const tdee = ref<string | null>(null);
const bmi = ref<string | null>(null);

export function useTracker() {
  return {
    weight,
    tdee,
    bmi,
    setWeight(value: string) {
      weight.value = value;
    },
    setTDEE(value: string) {
      tdee.value = value;
    },
    setBMI(value: string) {
      bmi.value = value;
    },
  };
}