import { computed, watchEffect, ref } from 'vue';
import useWeight from './useWeight';
import useHeight from './useHeight';
import useSex from './useSex';
import useAge from './useAge';
import useActivity from './useActivity';

export default function useCalculations() {
  const { currentWeight, isWeightReady } = useWeight();
  const { height, heightinMeters } = useHeight();
  const { sex } = useSex();
  const { age } = useAge();
  const { activity } = useActivity();

  const bmi = ref('');
  const tdee = ref('');

  const areAllFieldsReady = computed(() => {
    return (
      isWeightReady.value &&
      height.value &&
      heightinMeters.value &&
      sex.value &&
      age.value &&
      activity.value
    );
  });

  const calculateBmi = computed(() => {
    if (areAllFieldsReady.value) {
      return (currentWeight.value / (heightinMeters.value ** 2)).toFixed(2);
    }
    return 'Loading...';
  });

  const calculateTdee = computed(() => {
    if (areAllFieldsReady.value) {
      const sexAsNumber = sex.value === 'female' ? 655.095 : 66.473;
      const weightFactor = sex.value === 'female' ? 9.563 : 13.7516;
      const heightFactor = sex.value === 'female' ? 1.8496 : 5.0033;
      const ageFactor = sex.value === 'female' ? 4.6756 : 6.755;

      const REE =
        sexAsNumber +
        weightFactor * currentWeight.value +
        heightFactor * height.value -
        ageFactor * age.value;

      const activityAsNumber = Number(activity.value);
      return (REE * activityAsNumber).toFixed(2);
    }
    return 'Loading...';
  });

  watchEffect(() => {
    if (areAllFieldsReady.value) {
      bmi.value = calculateBmi.value;
      tdee.value = calculateTdee.value;

      localStorage.setItem('bmi', bmi.value);
      localStorage.setItem('tdee', tdee.value);
    }
  });

  return {
    bmi,
    tdee,
  };
}
