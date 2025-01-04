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

  // Variabili reattive per BMI e TDEE
  const bmi = ref('');
  const tdee = ref('');

  // Calcolo del BMI
  const calculateBmi = computed(() => {
    if (height.value && currentWeight.value) {
      return (currentWeight.value / (heightinMeters.value * heightinMeters.value)).toFixed(2);
    }
    return 'Please fill all fields to calculate your BMI.';
  });

  // Calcolo del TDEE
  const calculateTdee = computed(() => {
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

  // Assegna i valori calcolati alle variabili reattive
  watchEffect(() => {
    bmi.value = calculateBmi.value;
    tdee.value = calculateTdee.value;
    
    // Salva i valori calcolati nel localStorage
    localStorage.setItem('bmi', bmi.value);
    localStorage.setItem('tdee', tdee.value);
  });

  // Recupera i valori dal localStorage al montaggio del componente
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
