import { watch, ref, onMounted } from "vue"

const sex = ref<string>('')
const isSexReady = ref<boolean>(false)

export default function useSex() {

    watch(sex, () => {
        localStorage.setItem('sex', sex.value);
        isSexReady.value = true;
    });

    const submitSex = (newGender: string) => {
        sex.value = newGender;
        console.log("Sex submitted:", sex.value);
        isSexReady.value = true;
    };

    onMounted(() => {
        if (!isSexReady.value) {
            const storedSex = localStorage.getItem('sex');
            if (storedSex) {
                sex.value = storedSex;
                isSexReady.value = true;
            }
        }
    });

    return {
        sex,
        isSexReady,
        submitSex
    }
}