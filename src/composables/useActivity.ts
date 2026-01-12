import { watch, ref, onMounted } from "vue"

const activity = ref<string>('');
const isActivityReady = ref<boolean>(false);
const activityOptions = ['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extremelyActive'];

export default function useActivity() {

    const submitActivity = (newActivity: string) => {
        activity.value = newActivity;
        isActivityReady.value = true;
        console.log(activity.value);
    };
    

    watch(activity, () => {
        localStorage.setItem('activity', activity.value);
    });

    onMounted(() => {
        if (!isActivityReady.value) {
            const storedActivity = localStorage.getItem('activity');
            if (storedActivity) {
                activity.value = storedActivity;
                isActivityReady.value = true;
            }
        }
    });

    return {
        activity,
        isActivityReady,
        activityOptions,
        submitActivity
    }
}