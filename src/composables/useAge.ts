import { watch, ref, onMounted } from "vue"

export default function useAge() {
    const sex = ref<number | null>(null)

    watch(sex, () => {
        localStorage.setItem('Age', age.value);
    });

    onMounted(() => {
        const storedAge = localStorage.getItem('age');
        if (storedAge) {
            sex.value = storedAge;
        }
    });

    return {
        age
    }
}