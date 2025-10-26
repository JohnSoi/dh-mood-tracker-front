<script lang="ts" setup>
defineProps<{
    minimize: boolean;
    titleText: string;
    icon: string;
    fullText?: string;
    path?: string;
}>();

const emit = defineEmits(['menuItemClick']);
</script>

<template>
    <div
        :class="{'grid': minimize, 'flex flex-center': !minimize}"
        class="MenuItem__wrapper cursor-pointer transition w-full p-xs"
        :title="titleText"
        @click="emit('menuItemClick')"
    >
        <router-link :to="path" v-if="path">
            <i
                :class="'fa-' + icon"
                class="fa-solid "
            ></i>
            <span v-if="minimize" class="ml-xs">{{ fullText || titleText }}</span>
        </router-link>
        <i
            :class="'fa-' + icon"
            class="fa-solid"
            v-if="!path"
        ></i>
        <span v-if="minimize && !path" class="ml-xs">{{ fullText || titleText }}</span>
    </div>
</template>

<style lang="less" scoped>
.MenuItem__wrapper {
    color: var(--additional-color);
    grid-template-columns: 20% auto;

    &:hover {
        color: var(--main-color);
        background-color: var(--hover-background-color);
        border-bottom: 2px solid var(--additional-color);
    }
}
</style>