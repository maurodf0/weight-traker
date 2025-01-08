import { watch, ref, onMounted } from "vue"

export default function useAge() {
    const age = ref<number>(0)
    const isAgeReady = ref<boolean>(false)

    watch(age, () => {
        localStorage.setItem('age', age.value.toString());
        isAgeReady.value = true;
    });

   const submitAge = () => {
    if (age.value < 0 || age.value > 120 || isNaN(age.value)) {
        alert("Please enter a valid age between 0 and 120.");
        return;
        age.value = 0;
    }
    console.log("Age submitted:", age.value);
    isAgeReady.value = true;
};


    onMounted(() => {
        const storedAge = localStorage.getItem('age');
        if (storedAge) {
            age.value = age.value = parseInt(storedAge, 10);;
        }
    });

    return {
        age,
        submitAge,
        isAgeReady
    }
}