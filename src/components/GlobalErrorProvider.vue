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
import {ErrorInfo, useErrorHandler} from '@/composables/useErrorHandler';
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

EventBus.on('api:error', (res: IApiError) => handleApiError(res));
EventBus.on('app:error', (res: ErrorInfo) => showError(res));
</script>