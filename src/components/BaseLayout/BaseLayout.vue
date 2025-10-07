<script lang="ts" setup>
import {useBaseLayout} from "./BaseLayout";
import {type BaseLayoutEmits, type BaseLayoutProps} from "./interfaces";
import {useRoute} from "vue-router";
import {defineEmits, defineExpose, defineProps, onMounted, withDefaults} from "vue";
import {ChevronLeftIcon, ChevronRightIcon,} from '@heroicons/vue/24/outline';


const props = withDefaults(defineProps<BaseLayoutProps>(), {
    menuMinimize: true,
    theme: 'dark',
    appName: "MoodTracker"
});
const emits = defineEmits<BaseLayoutEmits>();

const {
    isMenuMinimize,
    currentTheme,
    toggleMenu,
    toggleTheme,
    minimizeAppName
} = useBaseLayout(props, emits);

const route = useRoute();

onMounted(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.value);
})

defineExpose({
    toggleMenu,
    toggleTheme
})
</script>

<template>
    <div class="BaseLayout__wrapper display-flex h-full w-full p-0">
        <nav :class="{'BaseLayout__nav-minimize': isMenuMinimize}" class="BaseLayout__nav h-full p-3 bg-secondary">
            <div class="BaseLayout__nav-logo">
                DH | {{ isMenuMinimize ? minimizeAppName() : appName }}
            </div>
            <div class="BaseLayout__nav-menuBtn pt-3 display-flex items-center justify-center">
                <ChevronRightIcon v-if="isMenuMinimize"
                                  class="cursor-pointer BaseLayout__nav-menuBtn_icon text-primary transition"
                                  title="Развернуть меню"
                                  @click="toggleMenu"></ChevronRightIcon>
                <ChevronLeftIcon v-if="!isMenuMinimize"
                                 class="cursor-pointer BaseLayout__nav-menuBtn_icon text-primary transition"
                                 title="Свернуть меню" @click="toggleMenu"></ChevronLeftIcon>
            </div>
        </nav>
        <main class="p-5">4342</main>
    </div>
</template>

<style lang="less" scoped src="./BaseLayout.less"></style>