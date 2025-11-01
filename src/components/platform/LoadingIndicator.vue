<script lang="ts" setup>
withDefaults(defineProps<{
    show: boolean;
    text?: string;
    global?: boolean;
}>(), {global: true});
</script>

<template>
    <div v-if="show"
         :class="{'screen-full': global, 'wh-full': !global}" class="LoadingIndicator__wrapper flex-center flex position-absolute font-size-xl">
        <i class="fa fa-spin fa-spinner"></i>
    </div>
</template>

<style lang="less" scoped>
.LoadingIndicator__wrapper {
    top: 0;
    left: 0;
    background-color: rgba(46, 46, 46, 0.69);
}
</style>