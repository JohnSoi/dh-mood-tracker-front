<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore";
import {Ref, ref} from "vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

const formData = ref({
    login: "",
    password: ""
});
const authStore = useAuthStore();
const authProcess = async () => {
    await authStore.login(formData.value.login, formData.value.password);
};
const activePage: Ref<"login" | "register"> = ref("login");
const passwordFieldType: Ref<"text" | "password"> = ref("password");

const changePasswordFieldType = (): void => {
    if (passwordFieldType.value === "password") {
        passwordFieldType.value = "text";
    } else {
        passwordFieldType.value = "password";
    }
};

</script>

<template>
    <div class="LoginView__wrapper flex flex-center wh-full">
        <div class="LoginView__form" v-if="activePage === 'login'">
            <form @submit.prevent="authProcess">
                <BaseInput title="Логин" name="login" :has-label="true" icon="user" placeholder="Введите ваш логин"
                           v-model:value="formData.login" :required="true" autocomplete="userLogin"/>
                <BaseInput title="Пароль" name="password" :has-label="true" icon="key" placeholder="Введите ваш пароль"
                           v-model:value="formData.password"
                           after-icon="eye"
                           :type="passwordFieldType"
                           @after-icon-click="changePasswordFieldType"
                           :required="true"
                           autocomplete="userPassword"
                />
                <BaseButton :rounded="true" class="w-full" icon="lock-open" theme="accent" title="Войти"
                            @click="authProcess"/>
            </form>
        </div>
    </div>
</template>

<style scoped lang="less">
.LoginView__form {
    width: 300px;
}
</style>