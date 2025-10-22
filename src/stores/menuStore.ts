import {defineStore} from "pinia";
import {ref} from "vue";
import {loadFromStorage, saveToStorage} from "@/utils/localStorage";

const useMenuStore = defineStore("menu", () => {
    const isExpanded = ref(loadFromStorage());

    function toggle() {
        isExpanded.value = !isExpanded.value;
        saveToStorage(isExpanded.value);
    }

    return {
        isExpanded,
        toggle
    }
});

export {useMenuStore};