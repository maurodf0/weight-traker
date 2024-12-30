import { onMounted, ref, computed} from 'vue'

export default function useWeight() {
const allWeights = ref<{ weight: number; date: Date }[]>([])

onMounted(() => {
  const storedWeights = localStorage.getItem('allWeights')
  if (storedWeights) {
    allWeights.value = JSON.parse(storedWeights).map((w: { weight: number; date: string }) => ({
      weight: w.weight,
      date: new Date(w.date)
    }));
  }
  })

  const sortedWeight = computed(() => {
  return [...allWeights.value].sort((a, b) => b.date.getTime() - a.date.getTime());
});

const currentWeight = computed(() => {
  return sortedWeight.value.length > 0 ? sortedWeight.value[0].weight : 0;
});


return {
  allWeights,
  sortedWeight,
  currentWeight,
}
}