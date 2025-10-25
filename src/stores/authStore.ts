import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
import {loadFromStorage} from "@/utils/localStorage";
import SourceService from "@/utils/service";

interface IUserData {
    email: string;
    name: string;
    surname: string;
    patronymic?: string;
}

interface IUserRegisterData extends IUserData {
    login: string;
    password: string;
}


const useAuthStore = defineStore("auth", async () => {
    const user: Ref<IUserData | null> = ref(null);
    const token: Ref<string> = ref(loadFromStorage("token", ""));

    const isAuthenticated = computed(() => !!token.value);

    const authService: SourceService = new SourceService({
        endpoint: "auth"
    });

    const setUserData = async (): Promise<void> => {
        await authService.call<unknown, IUserData>('me').then((res: IUserData | null) => {
            user.value = res;
        });
    }

    if (token.value && !user.value) {
        await setUserData();
    }

    const login = async (login: string, password: string): Promise<boolean> => {
        await authService.call<{login: string, password: string}, string>(
            "login", {login, password}
        ).then(async (response: string | null) => {
            if (response) {
                token.value = response;
                await setUserData();

                return true;
            }
        });

        return false;
    }

    const register = async (userRegisterData: IUserRegisterData): Promise<boolean> => {
        await authService.call<IUserRegisterData, boolean>("register", userRegisterData).then(
            (response: boolean | null) => {
                return !!response;
            }
        );

        return false;
    }

    return {
        user,
        isAuthenticated,
        login,
    }
});

export {useAuthStore};