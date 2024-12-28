import { watch } from "vue"

export default function useSex() {
    const sex = ref('male')

    watch(sex, () => {
        localStorage.setItem('sex', sex.value);
    });

    onMounted(() => {
        const storedSex = localStorage.getItem('sex');
        if (storedSex) {
            sex.value = storedSex;
        }
    });

    return {
        sex
    }
}