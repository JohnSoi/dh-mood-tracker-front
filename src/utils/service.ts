import {IBindings, IEndpointFullConfig, IHeaders, IRequestParams, ISourceServiceConfig} from "@/interfaces/service";
import {loadFromStorage} from "@/utils/localStorage";
import {EventBus} from "@/utils/eventBus";

/**
 * Базовый сервис для работы с API
 *
 * @class SourceService
 *
 * @example
 * ```typescript
 * // Простая конфигурация
 * const service = new SourceService({
 *     endpoint: "api/users"
 * });
 *
 * // Расширенная конфигурация
 * const service = new SourceService({
 *     endpoint: {
 *         contract: "v1",
 *         address: "https://api.example.com/"
 *     },
 *     bindings: {
 *         query: "search",
 *         create: "add"
 *     }
 * });
 *
 * // Использование
 * const users = await service.call<any, User[]>('list', { page: 1 });
 * ```
 */
class SourceService {
    protected _address = "http://localhost:8000/";
    protected _bindings: Required<IBindings> = {
        query: "list",
        create: "create",
        delete: "delete",
        update: "update",
        read: "read"
    };

    /**
     * Создает экземпляр SourceService
     *
     * @constructor
     * @param {ISourceServiceConfig} config - Конфигурация сервиса
     *
     * @example
     * ```typescript
     * const service = new SourceService({
     *     endpoint: "api/data",
     *     bindings: {
     *         query: "search",
     *         create: "add"
     *     }
     * });
     * ```
     */
    constructor(config: ISourceServiceConfig) {
        this._validateConfig(config);
        this._prepareAddress(config.endpoint);
        this._prepareBindings(config.bindings);
    }

    /**
     * Выполняет HTTP запрос к API
     *
     * @template RequestT - Тип данных запроса
     * @template ResponseT - Тип данных ответа
     *
     * @param {string} url - URL endpoint (добавляется к базовому адресу)
     * @param {RequestT} [request] - Данные для отправки в теле запроса
     * @param {string} [methodType="POST"] - HTTP метод (GET, POST, PUT, DELETE, etc.)
     * @param {IHeaders} [headers] - Дополнительные заголовки запроса
     *
     * @returns {Promise<ResponseT | null>} Promise с данными ответа или null в случае ошибки
     *
     * @example
     * ```typescript
     * // GET запрос
     * const user = await service.call<null, User>('users/123', null, 'GET');
     *
     * // POST запрос с данными
     * const newUser = await service.call<CreateUserDto, User>('users', userData, 'POST');
     *
     * // Запрос с кастомными заголовками
     * const data = await service.call<any, any>('secure', null, 'GET', {
     *     'Authorization': 'Bearer token'
     * });
     * ```
     */
    public async call<RequestT, ResponseT>(
        url: string, request?: RequestT, methodType?: string, headers?: IHeaders
    ): Promise<ResponseT | null> {
        return this._sendRequest<RequestT, ResponseT>(url, request, methodType, headers);
    }

    /**
     * Подготавливает базовый адрес из конфигурации endpoint
     *
     * @protected
     * @param {string | IEndpointFullConfig} endpoint - Конфигурация endpoint
     * @returns {void}
     */
    protected _prepareAddress(endpoint: string | IEndpointFullConfig): void {
        if (typeof endpoint === "string") {
            this._address += endpoint;

            if (!this._address.endsWith("/")) {
                this._address += "/";
            }

            return;
        }

        if (endpoint.address.startsWith("http")) {
            this._address = endpoint.address;
        } else {
            this._address += endpoint.address;
        }

        if (!endpoint.address.endsWith("/")) {
            this._address += "/";
        }

        this._address += endpoint.contract;

        if (!this._address.endsWith("/")) {
            this._address += "/";
        }
    }

    /**
     * Подготавливает привязки операций CRUD
     *
     * @protected
     * @param {IBindings} [bindings] - Пользовательские привязки операций
     * @returns {void}
     */
    protected _prepareBindings(bindings?: IBindings): void {
        if (!bindings) {
            return;
        }

        this._bindings = {
            ...this._bindings,
            ...bindings
        };
    }

    /**
     * Валидирует конфигурацию сервиса, проверяя обязательные параметры и их корректность
     *
     * @protected
     * @param {ISourceServiceConfig} config - Конфигурация сервиса для валидации
     * @returns {void}
     *
     * @throws {Error} Выбрасывает ошибку с описанием проблемы, если конфигурация невалидна
     *
     * @example
     * ```typescript
     * // Корректная конфигурация
     * this._validateConfig({
     *     endpoint: "api/users"
     * });
     *
     * // Корректная расширенная конфигурация
     * this._validateConfig({
     *     endpoint: {
     *         contract: "v1",
     *         address: "https://api.example.com"
     *     }
     * });
     *
     * // Некорректная конфигурация - выбросит ошибку
     * this._validateConfig({
     *     endpoint: "" // пустой endpoint
     * });
     *
     * // Некорректная расширенная конфигурация - выбросит ошибку
     * this._validateConfig({
     *     endpoint: {
     *         contract: "v1",
     *         address: "" // пустой address
     *     }
     * });
     * ```
     *
     * @remarks
     * Метод проверяет следующие условия:
     * - Наличие endpoint в конфигурации
     * - Для строкового endpoint: что строка не пустая
     * - Для объектного endpoint: наличие и непустоту свойства address
     * - Корректность формата URL (опционально, если реализовано)
     */
    protected _validateConfig(config: ISourceServiceConfig): void {
        if (!config.endpoint) {
            throw new Error('Конфигурация должна содержать endpoint');
        }

        if (typeof config.endpoint === 'string') {
            if (!config.endpoint.trim()) {
                throw new Error('Endpoint не может быть пустой строкой');
            }
        } else {
            if (!config.endpoint.address || !config.endpoint.address.trim()) {
                throw new Error('Endpoint конфигурация должна содержать address');
            }

            if (!config.endpoint.contract || !config.endpoint.contract.trim()) {
                throw new Error('Endpoint конфигурация должна содержать contract');
            }
        }
    }

    /**
     * Отправляет HTTP запрос использу Fetch API
     *
     * @protected
     * @template RequestT - Тип данных запроса
     * @template ResponseT - Тип данных ответа
     *
     * @param {string} url - URL endpoint
     * @param {RequestT} [request] - Данные запроса
     * @param {string} [methodType="POST"] - HTTP метод
     * @param {IHeaders} [headers] - Заголовки запроса
     * @param {number} [timeout] - время ожидания запроса
     *
     * @returns {Promise<ResponseT | null>} Promise с данными ответа или null в случае ошибки
     *
     * @throws {Error} Выбрасывает ошибку при проблемах с сетью
     */
    protected async _sendRequest<RequestT, ResponseT>(url: string, request?: RequestT, methodType?: string, headers?: IHeaders, timeout = 10000): Promise<ResponseT | null> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const requestParams: IRequestParams = {
            method: methodType || "POST",
            body: null,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            signal: controller.signal,
            credentials: 'include'
        };

        if (loadFromStorage("token", null)) {
            requestParams.headers.token = `Bearer ${loadFromStorage("token", "")}`
        }

        if (request) {
            requestParams["body"] = JSON.stringify(request);
        }

        try {
            const response = (await fetch(this._address + url, requestParams as RequestInit));
            clearTimeout(timeoutId);

            if (await this._hasError(response)) {
                return null;
            }

            return await response.json() as ResponseT;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof Error && error.name === 'AbortError') {
                console.error(`Запрос к ${url} превысил время ожидания`);
            }

            if (error instanceof Error && error.message === 'Failed to fetch') {
                EventBus.emit('api:error', {status: 500, details: "Ошибка обращения к стороннему сервису"});
            }

            console.log(error);
            return null;
        }
    }

    /**
     * Проверяет наличие ошибок в HTTP ответе
     *
     * @protected
     * @param {Response} response - Объект ответа Fetch API
     * @returns {boolean} true если есть ошибка, false если запрос успешен
     */
    protected async _hasError(response: Response): Promise<boolean> {
        if (response.ok) {
            return false;
        }
        const errorData: { detail: string } = await response.json();
        console.log("При запросе произошла ошибка: " + response.statusText + " с кодом " + response.status);

        EventBus.emit('api:error', {status: response.status, details: errorData.detail});

        switch (response.status) {
            case 401:
                console.log("Ошибка аутентификации");
                break;
            case 403:
                console.log("Ошибка доступа");
                break;
            case 404:
                console.log("Сущность не существует");
                break;
            case 422:
                console.log("Ошибка валидации");
                break;
        }

        return true
    }
}

export default SourceService;