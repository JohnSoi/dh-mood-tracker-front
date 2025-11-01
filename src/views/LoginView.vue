<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore";
import {Ref, ref} from "vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import {EventBus} from "@/utils/eventBus";

const formData = ref({
    login: "",
    password: ""
});

const formRegisterData = ref({
    name: "",
    surname: "",
    patronymic: "",
    login: "",
    password: "",
    repeatPassword: "",
    email: ""
});

const authStore = useAuthStore();
const authProcess = async () => {
    loading.value = true;
    await authStore.login(formData.value.login, formData.value.password);
    loading.value = false;
};


const registerProcess = async () => {
    if (formRegisterData.value.password != formRegisterData.value.repeatPassword) {
        EventBus.emit('app:error', {
            title: "Ошибка валидации",
            message: "Введенные вами пароли отличаются",
            details: 'Повторите ввод в полях паролей. Используйте "глазок" чтобы проверить данные',
            type: 'warning'
        });
        return;
    }

    if (formRegisterData.value.email && await authStore.authService.call<string, boolean>("emailExists", formRegisterData.value.email)) {
        EventBus.emit('app:error', {
            title: "Ошибка валидации",
            message: "Данные адрес электронной почты уже используется",
            type: 'warning'
        });
        return;
    }

    if (formRegisterData.value.login && await authStore.authService.call<string, boolean>("loginExists", formRegisterData.value.login)) {
        EventBus.emit('app:error', {
            title: "Ошибка валидации",
            message: "Данные логин уже используется",
            type: 'warning'
        });
        return;
    }

    if (await authStore.register({
        email: formRegisterData.value.email,
        password: formRegisterData.value.password,
        login: formRegisterData.value.login,
        surname: formRegisterData.value.surname,
        name: formRegisterData.value.name,
        patronymic: formRegisterData.value.patronymic
    })) {
        EventBus.emit('app:error', {
            title: "Вы успешно зарегистрировались",
            message: "На вашу почту будет отправлено письмо для потверждения. После этого вы можете войти в систему",
            type: "info"
        })
    }
}

const activePage: Ref<"login" | "register"> = ref("register");
const passwordFieldType: Ref<"text" | "password"> = ref("password");
const loading = ref(false);

const changePasswordFieldType = (): void => {
    if (passwordFieldType.value === "password") {
        passwordFieldType.value = "text";
    } else {
        passwordFieldType.value = "password";
    }
};

const changeViewMode = (): void => {
    if (activePage.value === "login") {
        activePage.value = "register";
    } else {
        activePage.value = "login";
    }
}

</script>

<template>
    <div class="LoginView__wrapper flex flex-center wh-full">
        <div class="LoginView__form" v-if="activePage === 'login'">
            <form @submit.prevent="authProcess">
                <BaseInput title="Логин" name="login" :has-label="true" icon="user" placeholder="Введите ваш логин"
                           v-model:value="formData.login" :required="true" additional-class="mb-xs"
                           autocomplete="userLogin"/>
                <BaseInput title="Пароль" name="password" :has-label="true" icon="key" placeholder="Введите ваш пароль"
                           v-model:value="formData.password"
                           after-icon="eye"
                           :type="passwordFieldType"
                           @after-icon-click="changePasswordFieldType"
                           :required="true"
                           autocomplete="userPassword"
                           additional-class="mb-xs"
                />
                <div class="flex mb-s mt-3xs flex-jc-end">
                    <RouterLink class="link transition" to="forgot-password">Забыли пароль?</RouterLink>
                </div>
                <BaseButton :rounded="true" class="w-full" icon="lock-open" theme="accent" title="Войти"
                            @click="authProcess"/>
                <div class="flex mb-s mt-xs flex-jc-center">
                    Вы еще не с нами?&nbsp;<a class="link transition" href="#" @click.prevent="changeViewMode">
                    Присоединиться</a>
                </div>
            </form>
        </div>
        <div v-if="activePage === 'register'" class="LoginView__form-register">
            <form @submit.prevent="registerProcess">
                <div class="flex mb-s">
                    <BaseInput v-model:value="formRegisterData.name" :has-label="true" :required="true" autocomplete="userName"
                               name="name" placeholder="Введите ваше имя" title="Имя"/>
                    <BaseInput v-model:value="formRegisterData.surname" :has-label="true" :required="true" additional-class="ml-xs"
                               autocomplete="userSurname" name="surname" placeholder="Введите ваше фамилию"
                               title="Фамилия"/>
                </div>
                <div class="flex mb-s">
                    <BaseInput v-model:value="formRegisterData.patronymic" :has-label="true" :required="false" autocomplete="userPatronymic"
                               name="patronymic" placeholder="Введите ваше отчество"
                               title="Отчество"/>
                    <BaseInput v-model:value="formRegisterData.login" :has-label="true" :required="true" additional-class="ml-xs"
                               autocomplete="userLoginReg" name="login" placeholder="Введите ваш логин"
                               title="Логин"/>
                </div>
                <div class="flex mb-s">
                    <BaseInput v-model:value="formRegisterData.password" :has-label="true" :required="true" :type="passwordFieldType"
                               after-icon="eye" autocomplete="userPasswordReg"
                               name="password" placeholder="Введите ваш пароль" title="Пароль"
                               @after-icon-click="changePasswordFieldType"/>
                    <BaseInput v-model:value="formRegisterData.repeatPassword" :has-label="true" :required="true"
                               :type="passwordFieldType"
                               additional-class="ml-xs" after-icon="eye"
                               autocomplete="userPasswordReg2" name="password2" placeholder="Повторите ваш пароль"
                               title="Повторите пароль" @after-icon-click="changePasswordFieldType"/>
                    <BaseInput v-model:value="formRegisterData.email" :has-label="true" :required="true" additional-class="ml-xs"
                               autocomplete="userEmail" name="email" placeholder="Введите вашу почту"
                               title="Почта"/>
                </div>
                <BaseButton :rounded="true" class="w-full" icon="user-plus" theme="accent" title="Регистрация"
                            @click="registerProcess"/>
            </form>
        </div>
        <LoadingIndicator :show="loading" text="Выполнятеся вход"/>
    </div>
</template>

<style scoped lang="less">
.LoginView__form {
    width: 300px;
}
</style>