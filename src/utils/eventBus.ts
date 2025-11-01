import mitt, {Emitter} from "mitt";
import {IApiError} from "@/interfaces/base";
import {ErrorInfo} from "@/composables/useErrorHandler";

type Events = {
    'api:error': IApiError;
    'app:error': ErrorInfo;
}

const EventBus: Emitter<Events> = mitt<Events>();

export {EventBus};