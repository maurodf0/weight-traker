import { ref, watch, computed, onMounted } from 'vue';

export default function useHeight() {

    const height = ref<number>(0);

    const submitHeight = (newHeight: number) => {
        height.value = newHeight;
    }

    const heightinMeters = computed(() => {
        return height.value / 100;
    });

    // Salva direttamente il valore di `height` in centimetri quando cambia
    watch(height, () => {
        localStorage.setItem('height', height.value.toString());
    });


    onMounted(() => {
        const storedHeight = localStorage.getItem('height');
        if (storedHeight) {
            height.value = Number(storedHeight);
        }
    });

    return {
        height,
        heightinMeters,
        submitHeight
    };
}