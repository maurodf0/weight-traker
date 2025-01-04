import { computed, onMounted, watchEffect } from 'vue';
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

  // Calcolo del BMI
const bmi = computed(() => {
  if (height.value && currentWeight.value) {
    return (currentWeight.value / (height.value * height.value)).toFixed(2);
  }
  return null; // fallback a null se i dati non sono disponibili
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
    const result = (REE * activityAsNumber).toFixed(2);
    return result; // ritorna sempre una stringa
  }
  return 'Please fill all fields to calculate your TDEE.'; // fallback per il caso che qualcosa sia null o undefined
});

  // Aggiungi watchEffect per monitorare cambiamenti di BMI e TDEE
  watchEffect(() => {
   localStorage.setItem('bmi', bmi.value);
    localStorage.setItem('tdee', tdee.value);
  });

  onMounted(() => {
    const storedBmi = localStorage.getItem('bmi');
    if (storedBmi) {
      bmi.value = storedBmi;
    }

    const storedTdee = localStorage.getItem('tdee');
    if (storedTdee) {
      tdee.value = storedTdee;
    }
  });

  return {
    bmi,
    tdee,
  };
}
