<template>
    <button
        :class="buttonClasses"
        :type="nativeType"
        :disabled="disabled || loading"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @focus="handleFocus"
        @blur="handleBlur"
    >
        <!-- Preloader -->
        <div v-if="loading" class="BaseButton__loader">
            <i class="fa fa-spinner fa-spin"></i>
        </div>

        <!-- Left icon -->
        <i
            v-if="icon && !loading"
            class="fa BaseButton__icon BaseButton__icon--left"
            :class="'fa-' + icon"
        ></i>

        <!-- Button content -->
        <span
            class="BaseButton__content"
            :class="{ 'BaseButton__content--hidden': loading && hideContentOnLoad }"
        >
            <slot>{{ title }}</slot>
        </span>

        <!-- Right icon -->
        <i
            v-if="afterIcon && !loading"
            class="fa BaseButton__icon BaseButton__icon--right"
            :class="'fa-' + afterIcon"
        ></i>

        <!-- Badge -->
        <span v-if="badge" class="BaseButton__badge">
            {{ badge }}
        </span>
    </button>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {IBaseButtonEmits, IBaseButtonProps} from "@/components/platform/BaseButton/interfaces";


const props = withDefaults(defineProps<IBaseButtonProps>(), {
    nativeType: 'button',
    theme: 'default',
    size: 'medium',
    disabled: false,
    loading: false,
    hideContentOnLoad: false,
    block: false,
    rounded: false,
    outline: false,
    badgeTheme: 'error'
});

const emit = defineEmits<IBaseButtonEmits>();

// Состояния взаимодействия
const isHovered = ref(false);
const isFocused = ref(false);
const isActive = ref(false);

// Классы кнопки
const buttonClasses = computed(() => [
    'BaseButton',
    `BaseButton--${props.theme}`,
    `BaseButton--${props.size}`,
    {
        'BaseButton--disabled': props.disabled,
        'BaseButton--loading': props.loading,
        'BaseButton--block': props.block,
        'BaseButton--rounded': props.rounded,
        'BaseButton--outline': props.outline,
        'BaseButton--hovered': isHovered.value,
        'BaseButton--focused': isFocused.value,
        'BaseButton--active': isActive.value,
        'BaseButton--with-icon': props.icon || props.afterIcon,
        'BaseButton--with-badge': props.badge
    }
]);

// Обработчики событий
const handleClick = (event: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', event);
    }
};

const handleMouseEnter = (event: MouseEvent) => {
    isHovered.value = true;
    emit('mouseenter', event);
};

const handleMouseLeave = (event: MouseEvent) => {
    isHovered.value = false;
    emit('mouseleave', event);
};

const handleFocus = (event: FocusEvent) => {
    isFocused.value = true;
    emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
    isFocused.value = false;
    emit('blur', event);
};
</script>

<style scoped lang="less" src="./BaseButton/style.less">
</style>