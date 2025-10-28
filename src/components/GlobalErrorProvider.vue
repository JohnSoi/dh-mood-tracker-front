<!-- components/GlobalErrorProvider.vue -->
<template>
    <ErrorModal
        :details="currentError.details"
        :message="currentError.message"
        :retry-loading="currentError.retryLoading"
        :show-retry="currentError.showRetry"
        :title="currentError.title"
        :type="currentError.type"
        :visible="errorModalVisible"
        @close="hideError"
        @retry="handleRetry"
        @update:visible="errorModalVisible = $event"
    />
</template>

<script lang="ts" setup>
import ErrorModal from './ErrorModal.vue';
import {useErrorHandler} from '@/composables/useErrorHandler';
import {provide} from "vue";
import {EventBus} from "@/utils/eventBus";
import {IApiError} from "@/interfaces/base";

const {
    errorModalVisible,
    currentError,
    handleRetry,
    hideError,
    showError,
    handleApiError
} = useErrorHandler();

// Предоставляем методы глобально
provide('errorHandler', {showError, handleApiError});
EventBus.on('api:error', (res: IApiError) => handleApiError(res));
</script>