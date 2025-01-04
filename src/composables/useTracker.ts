import { ref, watch, onMounted } from 'vue';

const weight = ref<string | null>(null);
const tdee = ref<string | null>(null);
const bmi = ref<string | null>(null);

// Funzione per sincronizzare una variabile reattiva con localStorage
function syncWithLocalStorage(key: string, refValue: any) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) refValue.value = storedValue;

  watch(refValue, () => {
    if (refValue.value !== null) {
      localStorage.setItem(key, refValue.value);
    }
  });
}

// Sincronizza le variabili con localStorage
syncWithLocalStorage('weight', weight);
syncWithLocalStorage('tdee', tdee);
syncWithLocalStorage('bmi', bmi);

export default function useTracker() {
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
