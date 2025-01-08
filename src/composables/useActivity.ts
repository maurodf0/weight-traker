import { watch, ref, onMounted } from "vue"

export default function useActivity() {
    const activity = ref<string>('');
    const isActivityReady = ref<boolean>(false);
    const activityOptions = ['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extremelyActive'];

    const submitActivity = (newActivity) => {
        activity.value = newActivity;
        isActivityReady.value = true;
        console.log(activity.value);
    };
    

    watch(activity, () => {
        localStorage.setItem('activity', activity.value);
    });

    onMounted(() => {
        const storedActivity = localStorage.getItem('activity');
        if (storedActivity) {
            activity.value = storedActivity;
            isActivityReady.value = true;
        }
    });

    return {
        activity,
        isActivityReady,
        activityOptions,
        submitActivity
    }
}