<template>
    <div class="BaseLayout__wrapper h-full w-full">
        <NLayout class="h-full w-full" has-sider>
            <NLayoutSider :collapsed="menuCollapsed" :width="200" bordered>
                <div class="BaseLayout__logo p-xs w-full flex flex-center">
                    <NAvatar src="./image/logo.jpg"></NAvatar>
                    <span class="ml-xs">MoodTracker</span>
                </div>
                <NMenu :collapsed="menuCollapsed" :options="menuOptions" accordion></NMenu>
            </NLayoutSider>
            <div class="BaseLayout__content">
                2
            </div>
        </NLayout>
    </div>
</template>

<script lang="ts" setup>
import {NAvatar, NIcon, NLayout, NLayoutSider, NMenu} from "naive-ui";
import {Component, h, ref} from "vue";
import {MenuOption} from "naive-ui/es/menu/src/interface";
import {HomeOutline, NewspaperOutline} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, {default: () => h(icon)})
}

const menuCollapsed = ref(false);
const menuOptions: MenuOption[] = [
    {
        "label": "Главная",
        "key": "home",
        "href": "/",
        "icon": renderIcon(HomeOutline)
    },
    {
        "label": "Лента",
        "key": "wall",
        "href": "/wall",
        "icon": renderIcon(NewspaperOutline)
    }
];
</script>

<style lang="less">
</style>