import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {loadFromStorage} from "@/utils/localStorage";
import SourceService from "@/utils/service";

const useAuthStore = defineStore("auth", () => {
    const user = ref(null);
    const token: Ref<string> = ref(loadFromStorage("token", ""));

    const isAuthenticated = computed(() => !!token.value);

    const authService: SourceService = new SourceService({
        endpoint: "auth"
    })

    const login = async (login: string, password: string): Promise<boolean> => {
        const authStatus = await authService.call<{login: string, password: string}, string>(
            "login", {login, password}
        ).then((response: string | null) => {
            if (response) {
                token.value = response;
                return true;
            }
        });

        return false;
    }
});

export {useAuthStore};