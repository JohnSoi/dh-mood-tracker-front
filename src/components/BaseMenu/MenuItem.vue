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
    <router-link v-if="path" :to="path">
        <div
            :class="{'grid': minimize, 'flex flex-center': !minimize}"
            :title="titleText"
            class="MenuItem__wrapper cursor-pointer transition w-full p-xs"
        >
            <i
                :class="'fa-' + icon"
                class="fa-solid "
            ></i>
            <span v-if="minimize" class="ml-xs">{{ fullText || titleText }}</span>
        </div>
    </router-link>
    <div
        v-if="!path"
        :class="{'grid': minimize, 'flex flex-center': !minimize}"
        :title="titleText"
        class="MenuItem__wrapper cursor-pointer transition w-full p-xs"
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
a {
    text-decoration: none;
}

.MenuItem__wrapper {
    color: var(--additional-color);
    grid-template-columns: 20% auto;

    &:hover {
        color: var(--main-color);
        background-color: var(--hover-background-color);
        border-bottom: 2px solid var(--additional-color);
    }
}


.router-link-active > .MenuItem__wrapper {
    color: var(--main-color);
}
</style>