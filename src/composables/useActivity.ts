import { watch, ref, onMounted } from "vue"

export default function useActivity() {
    const activity = ref<string>('');

    watch(activity, () => {
        localStorage.setItem('activity', activity.value);
    });

    onMounted(() => {
        const storedActivity = localStorage.getItem('activity');
        if (storedActivity) {
            activity.value = storedActivity;
        }
    });

    return {
        activity
    }
}