import { watch, ref, onMounted } from "vue"

export default function useAge() {
    const age = ref<number>(0)

    watch(age, () => {
        localStorage.setItem('Age', age.value.toString());
    });

    const submitAge = () => {
        age.value = age.value
        console.log(age.value)
    }

    onMounted(() => {
        const storedAge = localStorage.getItem('age');
        if (storedAge) {
            age.value = age.value = parseInt(storedAge, 10);;
        }
    });

    return {
        age,
        submitAge
    }
}