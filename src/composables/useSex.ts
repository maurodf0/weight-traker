import { watch, ref, onMounted } from "vue"

export default function useSex() {
    const sex = ref<string>('')

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