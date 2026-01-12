import { watch, ref, onMounted } from "vue"

const age = ref<number>(0)
const isAgeReady = ref<boolean>(false)

export default function useAge() {

    watch(age, () => {
        localStorage.setItem('age', age.value.toString());
        isAgeReady.value = true;
    });

   const submitAge = () => {
    if (age.value < 0 || age.value > 120 || isNaN(age.value)) {
        alert("Please enter a valid age between 0 and 120.");
        return;
    }
    console.log("Age submitted:", age.value);
    isAgeReady.value = true;
};


    onMounted(() => {
        const storedAge = localStorage.getItem('age');
        if (storedAge) {
            age.value = parseInt(storedAge, 10);
            isAgeReady.value = true;
        }
    });

    return {
        age,
        submitAge,
        isAgeReady
    }
}