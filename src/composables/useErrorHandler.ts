// composables/useErrorHandler.ts
import {reactive, ref} from 'vue';
import {IApiError} from "@/interfaces/base";

export interface ErrorInfo {
    title?: string;
    message: string;
    details?: string;
    type?: 'error' | 'warning' | 'info';
    showRetry?: boolean;
    retryCallback?: () => Promise<void> | void;
}

export function useErrorHandler() {
    const errorModalVisible = ref(false);
    const currentError = reactive<ErrorInfo & { retryLoading: boolean }>({
        message: '',
        retryLoading: false
    });

    const showError = (errorInfo: ErrorInfo): void => {
        Object.assign(currentError, {
            ...errorInfo,
            retryLoading: false
        });
        errorModalVisible.value = true;
    };

    const hideError = () => {
        errorModalVisible.value = false;
        currentError.details = '';
        currentError.message = '';
        currentError.retryLoading = false;
    };

    const handleApiError = (errorData: IApiError) => {
        const message = errorData.details || 'Произошла непредвиденная ошибка';
        let title = 'Ошибка API';

        switch (errorData.status) {
            case 401:
                title = "Ошибка аутентификации";
                break;
            case 403:
                title = "Доступ запрещен";
                break;
            case 404:
                title = "Сущность не найдена";
                break;
            case 422:
                title = "Ошибка валидации";
                break;
            case 500:
                title = "Внутренняя ошибка сервиса";
                break;
        }

        showError({
            title,
            message,
            type: 'error',
            showRetry: errorData.showRetry,
            retryCallback: errorData.retryCallback
        });
    };

    const handleRetry = async () => {
        if (currentError.retryCallback) {
            currentError.retryLoading = true;
            try {
                await currentError.retryCallback();
                hideError();
            } catch (error) {
                handleApiError({details: "Повторная попытка не удалась", status: 500, showRetry: false});
            } finally {
                currentError.retryLoading = false;
            }
        } else {
            hideError();
        }
    };

    return {
        errorModalVisible,
        currentError,
        showError,
        hideError,
        handleApiError,
        handleRetry
    };
}