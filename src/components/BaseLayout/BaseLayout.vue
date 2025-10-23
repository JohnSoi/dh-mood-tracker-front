<template>
    <div :class="{'dark-theme': appStore.isDarkTheme()}" class="BaseLayout__wrapper h-full w-full flex">
        <div class="BaseLayout__menu">
            <BaseMenu/>
        </div>
        <div class="BaseLayout__content shadow p-xs w-full">
            2
        </div>
    </div>
</template>

<script lang="ts" setup>

import BaseMenu from "@/components/BaseMenu/BaseMenu.vue";
import {useAppStore} from "@/stores/appStore";

const appStore = useAppStore();
</script>

<style lang="less">
.BaseLayout__content {
    background-color: var(--second-background-color);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
}

.BaseLayout__wrapper {
    background-color: var(--main-background-color);
    color: var(--main-text-color);
}
</style>