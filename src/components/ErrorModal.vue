<!-- components/ErrorModal.vue -->
<template>
    <Transition name="modal">
        <div v-if="visible" class="error-modal-overlay" @click.self="handleOverlayClick">
            <div class="error-modal">
                <!-- Header -->
                <div :class="`error-modal__header--${type}`" class="error-modal__header">
                    <div class="error-modal__icon">
                        <i :class="iconClass" class="fa"></i>
                    </div>
                    <h3 class="error-modal__title">{{ title }}</h3>
                    <button class="error-modal__close" @click="close">
                        <i class="fa fa-times"></i>
                    </button>
                </div>

                <!-- Content -->
                <div class="error-modal__content">
                    <p class="error-modal__message">{{ message }}</p>

                    <!-- Детали ошибки (раскрывающиеся) -->
                    <div v-if="details" class="error-modal__details">
                        <button
                            class="error-modal__details-toggle"
                            @click="showDetails = !showDetails"
                        >
                            <span>Детали ошибки</span>
                            <i :class="showDetails ? 'fa-chevron-up' : 'fa-chevron-down'" class="fa"></i>
                        </button>

                        <Transition name="slide">
                            <div v-if="showDetails" class="error-modal__details-content">
                                <pre>{{ details }}</pre>
                            </div>
                        </Transition>
                    </div>
                </div>

                <!-- Actions -->
                <div class="error-modal__actions">
                    <BaseButton
                        v-if="showRetry"
                        :loading="retryLoading"
                        :theme="retryButtonTheme"
                        @click="handleRetry"
                    >
                        <i class="fa fa-refresh"></i>
                        Повторить
                    </BaseButton>

                    <BaseButton
                        v-for="action in customActions"
                        :key="action.label"
                        :outline="action.outline"
                        :theme="action.theme || 'default'"
                        @click="action.handler"
                    >
                        {{ action.label }}
                    </BaseButton>

                    <BaseButton
                        theme="accent"
                        @click="close"
                    >
                        Закрыть
                    </BaseButton>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import BaseButton from './BaseButton.vue';

interface ErrorAction {
    label: string;
    theme?: 'default' | 'accent' | 'warning' | 'error' | 'success' | 'ghost';
    outline?: boolean;
    handler: () => void;
}

interface Props {
    visible: boolean;
    title?: string;
    message: string;
    details?: string;
    type?: 'error' | 'warning' | 'info';
    showRetry?: boolean;
    retryLoading?: boolean;
    customActions?: ErrorAction[];
    closeOnOverlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Ошибка',
    type: 'error',
    showRetry: false,
    retryLoading: false,
    customActions: () => [],
    closeOnOverlay: true
});

const emit = defineEmits<{
    'update:visible': [value: boolean];
    'close': [];
    'retry': [];
}>();

const showDetails = ref(false);

// Иконка в зависимости от типа
const iconClass = computed(() => {
    switch (props.type) {
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
            return 'fa-info-circle';
        default:
            return 'fa-exclamation-circle';
    }
});

// Тема для кнопки повтора
const retryButtonTheme = computed(() => {
    switch (props.type) {
        case 'warning':
            return 'warning';
        case 'info':
            return 'accent';
        default:
            return 'error';
    }
});

const close = () => {
    emit('update:visible', false);
    emit('close');
};

const handleOverlayClick = () => {
    if (props.closeOnOverlay) {
        close();
    }
};

const handleRetry = () => {
    emit('retry');
};
</script>

<style lang="less" scoped>
.error-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.error-modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &__header {
        display: flex;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid #f0f0f0;

        &--error {
            background: linear-gradient(135deg, #fff5f5, #fff);
        }

        &--warning {
            background: linear-gradient(135deg, #fffbf0, #fff);
        }

        &--info {
            background: linear-gradient(135deg, #f0f9ff, #fff);
        }
    }

    &__icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        flex-shrink: 0;

        .error-modal__header--error & {
            background: #fee2e2;
            color: #dc2626;
        }

        .error-modal__header--warning & {
            background: #fef3c7;
            color: #d97706;
        }

        .error-modal__header--info & {
            background: #dbeafe;
            color: #2563eb;
        }

        .fa {
            font-size: 18px;
        }
    }

    &__title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        flex: 1;

        .error-modal__header--error & {
            color: #dc2626;
        }

        .error-modal__header--warning & {
            color: #d97706;
        }

        .error-modal__header--info & {
            color: #2563eb;
        }
    }

    &__close {
        background: none;
        border: none;
        font-size: 18px;
        color: #6b7280;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s;

        &:hover {
            background: #f3f4f6;
            color: #374151;
        }
    }

    &__content {
        padding: 24px;
        flex: 1;
        overflow-y: auto;
    }

    &__message {
        margin: 0 0 16px 0;
        font-size: 16px;
        line-height: 1.5;
        color: #374151;
    }

    &__details {
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        overflow: hidden;
    }

    &__details-toggle {
        width: 100%;
        background: #f9fafb;
        border: none;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        font-size: 14px;
        color: #6b7280;
        transition: background 0.2s;

        &:hover {
            background: #f3f4f6;
        }
    }

    &__details-content {
        background: #1f2937;
        color: #f9fafb;
        padding: 16px;

        pre {
            margin: 0;
            font-size: 12px;
            line-height: 1.4;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    }

    &__actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        padding: 20px 24px;
        border-top: 1px solid #f0f0f0;
        background: #fafafa;
    }
}

// Анимации
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;

    .error-modal {
        transition: transform 0.3s ease;
    }
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;

    .error-modal {
        transform: scale(0.9);
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: max-height 0.3s ease;
    max-height: 200px;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
}
</style>