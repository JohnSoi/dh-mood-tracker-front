import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {loadFromStorage, saveToStorage} from "@/utils/localStorage";

const useMenuStore = defineStore("menu", () => {
    const isExpanded: Ref<boolean> = ref(loadFromStorage<boolean>('menu-expanded', false));

    function toggle() {
        isExpanded.value = !isExpanded.value;
        saveToStorage<boolean>('menu-expanded', isExpanded.value);
    }

    return {
        isExpanded,
        toggle
    }
});

export {useMenuStore};