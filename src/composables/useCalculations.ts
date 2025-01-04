import { computed, onMounted, ref, watchEffect } from 'vue';
import useWeight from './useWeight';
import useHeight from './useHeight';
import useSex from './useSex';
import useAge from './useAge';
import useActivity from './useActivity';

export default function useCalculations() {
  const { currentWeight } = useWeight();
  const { height, heightinMeters } = useHeight();
  const { sex } = useSex();
  const { age } = useAge();
  const { activity } = useActivity();

  // Variabili di stato per immagazzinare i valori recuperati
  const bmiFromStorage = ref<string | null>(null);
  const tdeeFromStorage = ref<string | null>(null);

  // Calcolo del BMI
  const bmi = computed(() => {
    if (height.value && currentWeight.value) {
      return (currentWeight.value / (height.value * height.value)).toFixed(2);
    }
    return 'Please enter valid weight and height to calculate your BMI.';
  });

  // Calcolo del TDEE
  const tdee = computed(() => {
    if (sex.value && activity.value && height.value && age.value && currentWeight.value) {
      const sexAsNumber = Number(sex.value);
      let REE = 0;

      if (sexAsNumber === 655.095) {
        // Donne
        REE = sexAsNumber + (9.563 * currentWeight.value) + (1.8496 * height.value) - (4.6756 * age.value);
      } else if (sexAsNumber === 66.473) {
        // Uomini
        REE = sexAsNumber + (13.7516 * currentWeight.value) + (5.0033 * height.value) - (6.7550 * age.value);
      } else {
        return 'Please enter valid sex to calculate your TDEE.';
      }

      const activityAsNumber = Number(activity.value);
      return (REE * activityAsNumber).toFixed(2); // ritorna sempre una stringa
    }
    return 'Please fill all fields to calculate your TDEE.';
  });

  // Aggiungi watchEffect per monitorare cambiamenti di BMI e TDEE
  watchEffect(() => {
    localStorage.setItem('bmi', bmi.value);
    localStorage.setItem('tdee', tdee.value);
  });

  // Recupera i valori salvati da localStorage
  onMounted(() => {
    const storedBmi = localStorage.getItem('bmi');
    if (storedBmi) {
      bmiFromStorage.value = storedBmi;
    }

    const storedTdee = localStorage.getItem('tdee');
    if (storedTdee) {
      tdeeFromStorage.value = storedTdee;
    }
  });

  return {
    bmi: bmiFromStorage.value || bmi.value, // Usa il valore salvato o calcolato
    tdee: tdeeFromStorage.value || tdee.value, // Usa il valore salvato o calcolato
  };
}
