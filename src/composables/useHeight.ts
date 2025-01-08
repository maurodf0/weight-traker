import { ref, watch, computed, onMounted } from 'vue';

export default function useHeight() {
  const height = ref<number>(0); // Altezza in centimetri
  const isHeightReady = ref(false); // Indica se l'altezza è stata caricata

  const submitHeight = (newHeight: number) => {
    height.value = newHeight;
    isHeightReady.value = true; // Indica che i dati sono disponibili
  };

  const heightinMeters = computed(() => {
    return height.value / 100;
  });

  // Salva il valore di `height` in localStorage quando cambia
watch(height, () => {
  if (height.value !== undefined && height.value !== 0) {
    localStorage.setItem('height', JSON.stringify(height.value));
  }
});

  // Recupera il valore da localStorage al montaggio
  onMounted(() => {
    const storedHeight = localStorage.getItem('height');
    if (storedHeight) {
      height.value =  JSON.parse(storedHeight);
      isHeightReady.value = true; // Dati caricati con successo
    }
  });

  return {
    height,
    heightinMeters,
    submitHeight,
    isHeightReady, // Restituiamo lo stato per controllare quando è pronto
  };
}
