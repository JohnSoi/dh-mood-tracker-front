<script lang="ts" setup>
import {useMenuStore} from "@/stores/menuStore";
import {ref} from "vue";

const menuStore = useMenuStore();

const activeMenuItem = ref("home");

const MENU_ITEMS = [
    {
        key: "home",
        title: "Главная",
        icon: "fa-home",
        href: "/"
    },
    {
        key: "wall",
        title: "Лента",
        icon: "fa-clock",
        href: "/wall"
    }
];
</script>

<template>
    <div class="BaseMenu__wrapper h-full p-xs">
        <div class="BaseMenu__logo p-3xs flex flex-center">
            <svg id="Icons" class="border-round shadow"
                 style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve"
                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="BaseMenu__logo-icon" d="M19,24c0-3.31,2.69-6,6-6c0.78,0,1.53,0.15,2.21,0.43l0.68-0.74c1.36-1.48,2.11-3.41,2.11-5.42  c0-4.19-3.14-7.81-7.15-8.23C20.21,3.77,17.7,4.77,16,6.7c-1.7-1.93-4.21-2.93-6.85-2.66C5.14,4.46,2,8.08,2,12.27  c0,2.01,0.75,3.94,2.11,5.42l7.8,8.51C12.96,27.34,14.45,28,16,28c1.33,0,2.62-0.49,3.62-1.35C19.23,25.85,19,24.95,19,24z"/>
                <path class="BaseMenu__logo-iconAdditional"
                      d="M28,23h-2v-2c0-0.55-0.45-1-1-1s-1,0.45-1,1v2h-2c-0.55,0-1,0.45-1,1s0.45,1,1,1h2v2c0,0.55,0.45,1,1,1  s1-0.45,1-1v-2h2c0.55,0,1-0.45,1-1S28.55,23,28,23z"/></svg>
            <h1 v-if="menuStore.isExpanded" class="ml-xs pl-xs" title="Mood Tracker">MD</h1>
        </div>
        <hr class="mt-xs">
        <div class="BaseMenu__content mt-xs">
            <div class="BaseMenu__button transition w-full flex flex-center" @click="menuStore.toggle">
                <i
                    :class="{'fa-align-left': menuStore.isExpanded, 'fa-align-justify': !menuStore.isExpanded}"
                    :title="menuStore.isExpanded ? 'Свернуть' : 'Развернуть'"
                    class="fa-solid "
                ></i>
                <span v-if="menuStore.isExpanded" class="ml-xs">Свернуть</span>
            </div>
            <hr class="mt-xs">
            <div v-for="item in MENU_ITEMS"
                 :key="item.key" :class="{'BaseMenu__button-active': activeMenuItem == item.key}"
                 class="BaseMenu__button p-xs transition w-full">
                <i :class="item.icon" :title="item.title" class="fa-solid"></i>
                <span v-if="menuStore.isExpanded" class="ml-xs">{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.BaseMenu__wrapper {
    min-width: 80px;
}

.BaseMenu__logo svg {
    background-color: var(--second-background-color);
    width: 50px;
    height: 50px;
}

.BaseMenu__logo h1 {
    border-left: 2px solid grey;
}

.BaseMenu__logo-icon {
    fill: var(--main-color);
}

.BaseMenu__logo-iconAdditional {
    fill: var(--additional-color);
}

.BaseMenu__button {
    color: var(--additional-color);
    display: grid;
    grid-template-columns: 20% auto;

    &:hover {
        color: var(--main-color);
        background-color: var(--hover-background-color);
    }

}
</style>