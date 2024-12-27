import { ref, watch, onMounted, computed } from 'vue';

export default function useHeight() {

    const height = ref<number>(0);

    const submitHeight = (newHeight: number) => {
        height.value = newHeight
    }
    const heightinMeters = computed(() => {
        return height.value / 100
    })

        watch(heightinMeters, () => {
        localStorage.setItem('height', heightinMeters.value.toString())
    })
    
    onMounted(() => {
        const storedHeight = localStorage.getItem('height')
        if (storedHeight) {
            height.value = Number(storedHeight)
        }
    })

    return {
        height,
        submitHeight
    }

}