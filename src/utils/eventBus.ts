import mitt, {Emitter} from "mitt";
import {IApiError} from "@/interfaces/base";

type Events = {
    'api:error': IApiError;
}

const EventBus: Emitter<Events> = mitt<Events>();

export {EventBus};