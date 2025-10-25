/**
 * Конфигурация полного endpoint
 * @interface
 */
interface IEndpointFullConfig {
    /** Название контракта/модуля */
    contract: string;
    /** Базовый адрес endpoint */
    address: string;
}

/**
 * Привязки операций CRUD к конкретным URL
 * @interface
 */
interface IBindings {
    /** Операция запроса списка */
    query?: string;
    /** Операция создания */
    create?: string;
    /** Операция удаления */
    delete?: string;
    /** Операция обновления */
    update?: string;
    /** Операция чтения одной записи */
    read?: string;
}

/**
 * Конфигурация сервиса данных
 * @interface
 */
interface ISourceServiceConfig {
    /** Endpoint для запросов */
    endpoint: string | IEndpointFullConfig;
    /** Привязки операций */
    bindings?: IBindings;
    /** Название свойства-идентификатора */
    keyProperty?: string;
}

/**
 * Заголовки HTTP запроса
 * @interface
 */
interface IHeaders {
    [key: string]: string | boolean;
}

/**
 * Параметры HTTP запроса
 * @interface
 */
interface IRequestParams {
    /** HTTP метод */
    method: string;
    /** Тело запроса */
    body: string | null;
    /** Заголовки запроса */
    headers: IHeaders;
    /** Сигнал для управления прерыванием запроса по таймауту */
    signal: AbortSignal;
    /** Токен авторизации */
    token?: string;
}


export {IEndpointFullConfig, IRequestParams, ISourceServiceConfig, IBindings, IHeaders};