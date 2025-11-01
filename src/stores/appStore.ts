import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {loadFromStorage, saveToStorage} from "@/utils/localStorage";

const useAppStore = defineStore("app", () => {
    const theme: Ref<"light" | "dark"> = ref(loadFromStorage<"light" | "dark">("appTheme", "light"));


    function changeTheme() {
        if (theme.value === "dark") {
            theme.value = "light";
        } else {
            theme.value = "dark";
        }

        saveToStorage("appTheme", theme.value);
    }

    function isDarkTheme(): boolean {
        return theme.value === "dark";
    }

    return {
        theme,
        changeTheme,
        isDarkTheme
    }
});

export {useAppStore};