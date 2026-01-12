import { computed, watchEffect, ref } from 'vue';
import useWeight from './useWeight';
import useHeight from './useHeight';
import useSex from './useSex';
import useAge from './useAge';
import useActivity from './useActivity';

export default function useCalculations() {
  const { currentWeight, isWeightReady } = useWeight();
  const { height, heightinMeters, isHeightReady } = useHeight();
  const { sex, isSexReady } = useSex();
  const { age, isAgeReady } = useAge();
  const { activity, isActivityReady } = useActivity();

  const bmi = ref('');
  const tdee = ref('');
  const isLoading = ref(true);

  const areAllFieldsReady = computed(() => {
    return (
      isWeightReady.value &&
      isHeightReady.value &&
      isSexReady.value &&
      isAgeReady.value &&
      isActivityReady.value &&
      height.value &&
      heightinMeters.value &&
      sex.value &&
      age.value &&
      activity.value
    );
  });

  const calculateBmi = computed(() => {
    if (areAllFieldsReady.value) {
      isLoading.value = false;
      return (currentWeight.value / (heightinMeters.value ** 2)).toFixed(2);
    }
    isLoading.value = true;
    return 'Loading...';
  });

  const calculateTdee = computed(() => {
    if (areAllFieldsReady.value) {
      isLoading.value = false;
      const weightFactor = sex.value === '655.0955' ? 9.563 : 13.7516;
      const heightFactor = sex.value === '655.0955' ? 1.8496 : 5.0033;
      const ageFactor = sex.value === '655.0955' ? 4.6756 : 6.755;

      const REE =
        parseInt(sex.value) +
        weightFactor * currentWeight.value +
        heightFactor * height.value -
        ageFactor * age.value;

      const activityAsNumber = Number(activity.value);
      return (REE * activityAsNumber).toFixed(2);
    }
    isLoading.value = true;
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
    isLoading
  };
}
