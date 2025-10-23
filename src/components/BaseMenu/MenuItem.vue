<script lang="ts" setup>
defineProps<{
    minimize: boolean;
    titleText: string;
    icon: string;
    fullText?: string;
}>();

const emit = defineEmits(['menuItemClick'])
</script>

<template>
    <div
        :class="{'grid': minimize, 'flex flex-center': !minimize}"
        class="MenuItem__wrapper cursor-pointer transition w-full p-xs"
        :title="titleText"
        @click="emit('menuItemClick')"
    >
        <i
            :class="'fa-' + icon"
            class="fa-solid "
        ></i>
        <span v-if="minimize" class="ml-xs">{{ fullText || titleText }}</span>
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