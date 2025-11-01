import {ErrorInfo} from "@/composables/useErrorHandler";
import {IApiError} from "@/interfaces/base";

interface IErrorProvide {
    showError: (errorInfo: ErrorInfo) => void,
    handleApiError: (errorData: IApiError) => void
}

export {IErrorProvide};