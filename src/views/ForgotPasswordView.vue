<script lang="ts" setup>

import BaseInput from "@/components/platform/BaseInput.vue";
import BaseButton from "@/components/platform/BaseButton.vue";

const forgotData = {
    login: '',
    email: ''
}
</script>

<template>
    <div class="ForgotPasswordView__wrapper flex flex-center wh-full">
        <form @submit.prevent="">
            <BaseInput v-model:value="forgotData.login" :has-label="true" :required="true" additional-class="mb-xs" autocomplete="userLogin"
                       icon="user" name="login" placeholder="Введите ваш логин"
                       title="Логин"/>
            <BaseInput v-model:value="forgotData.email" :has-label="true" :required="true" additional-class="mb-xs"
                       autocomplete="userEmail"
                       icon="user" name="email" placeholder="Введите ваш адрес электронной почты"
                       title="Email"/>
            <div class="flex mb-s mt-xs flex-jc-end">
                Вспомнили?&nbsp;<RouterLink class="link transition" to="login">Войти в систему</RouterLink>
            </div>
            <BaseButton :rounded="true" class="w-full" icon="repeat" theme="accent" title="Восстановить"
                        @click="authProcess"/>
        </form>
    </div>
</template>

<style lang="less" scoped>

</style>