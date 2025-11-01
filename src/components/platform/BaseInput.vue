<script setup lang="ts">
import {IBaseInputProps} from "@/components/platform/BaseInput/interfaces";

withDefaults(defineProps<IBaseInputProps>(), {
    hasLabel: true,
    type: "text",
    disabled: false,
    readonly: false,
    required: false,
    additionalClass: ''
});

const emit = defineEmits<{
    'iconClick': [];
    'afterIconClick': [];
    'update:value': [value: string];
    'focus': [event: FocusEvent];
    'blur': [event: FocusEvent];
    'input': [event: Event];
}>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:value', target.value);
    emit('input', event);
};

const handleFocus = (event: FocusEvent) => {
    emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
    emit('blur', event);
};
</script>

<template>
    <div :class="additionalClass" class="BaseInput__wrapper w-full">
        <label
            :for="name"
            class="BaseInput__label"
            :class="{ 'BaseInput__label--hidden': !hasLabel }"
        >
            {{ title }}
            <span v-if="required" class="BaseInput__required">*</span>
        </label>

        <div
            class="BaseInput__content pl-xs pr-xs flex f-align-center border-round w-full"
            :class="{
                'mt-2xs': hasLabel,
                'BaseInput__content--error': error,
                'BaseInput__content--success': success,
                'BaseInput__content--disabled': disabled,
                'BaseInput__content--readonly': readonly
            }"
        >
            <i
                v-if="icon"
                class="fa BaseInput__icon"
                :class="'fa-' + icon"
                @click="emit('iconClick')"
            ></i>

            <input
                :id="name"
                :name="name"
                :type="type"
                :value="value"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :autocomplete="autocomplete"
                :maxlength="maxlength"
                :minlength="minlength"
                :required="required"
                class="BaseInput__input ml-xs border-round w-full"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
            >

            <i
                v-if="afterIcon"
                class="fa BaseInput__icon BaseInput__icon--after"
                :class="'fa-' + afterIcon"
                @click="emit('afterIconClick')"
            ></i>
        </div>

        <div
            v-if="error"
            class="BaseInput__error-message"
        >
            {{ error }}
        </div>

        <div
            v-if="maxlength"
            class="BaseInput__counter"
            :class="{ 'BaseInput__counter--error': value.length > maxlength }"
        >
            {{ value.length }} / {{ maxlength }}
        </div>
    </div>
</template>

<style scoped lang="less" src="./BaseInput/style.less">
</style>