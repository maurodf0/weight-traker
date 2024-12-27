import { ref, watch, reactive, onMounted } from 'vue';

export default function useHeight() {

    
    const height = ref<number>(0);
    


    const submitHeight = (newHeight: number) => {
        height.value = newHeight
    }
    const heightinMeters = computed(() => {
        return height.value / 100
    })

        watch(heightinMeters, () => {
        console.log('height changed')
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
    }

}