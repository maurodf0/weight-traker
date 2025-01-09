import { watch, ref, onMounted } from "vue"

export default function useSex() {
    const sex = ref<string>('')
    const isSexReady = ref<boolean>(false)

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
        const storedSex = localStorage.getItem('sex');
        if (storedSex) {
            sex.value = storedSex;
            isSexReady.value = true;
        }
    });

    return {
        sex,
        isSexReady,
        submitSex
    }
}