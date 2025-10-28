import {defineStore} from "pinia";
import {computed, ComputedRef, Ref, ref} from "vue";
import {loadFromStorage, saveToStorage} from "@/utils/localStorage";
import SourceService from "@/utils/service";

interface IPersonData {
    name: string;
    surname: string;
    patronymic?: string;
}

interface IUserData extends IPersonData {
    email: string;

}

interface IUserRegisterData extends IUserData {
    login: string;
    password: string;
}

interface IPersonFullData extends IUserData {
    full_name: string;
    short_full_name: string;
    initials: string;
}




const useAuthStore = defineStore("auth", () => {
    const user: Ref<IPersonFullData | null> = ref(loadFromStorage<IPersonFullData | null>("user", null));
    const token: Ref<string> = ref(loadFromStorage("token", ""));

    const isAuthenticated: ComputedRef<boolean> = computed(() => !!token.value);

    const authService: SourceService = new SourceService({
        endpoint: "auth"
    });

    const setUserData = async (): Promise<void> => {
        await authService.call<unknown, IPersonFullData>('me').then((res: IPersonFullData | null) => {
            if (res) {
                user.value = res;
                saveToStorage("user", res);
            }
        });
    }

    const login = async (login: string, password: string): Promise<boolean> => {
        await authService.call<{login: string, password: string}, string>(
            "login", {login, password}
        ).then(async (response: string | null) => {
            if (response) {
                token.value = response;
                saveToStorage("token", response);
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

    const logout = async (): Promise<boolean> => {
        await authService.call<unknown, boolean>("logout").then((response: boolean | null) => {
            if (response) {
                user.value = null;
                token.value = '';
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                return true;
            }
        });

        return false;
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        setUserData,
    }
});

export {useAuthStore};