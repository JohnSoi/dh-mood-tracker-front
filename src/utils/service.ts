interface IEndpointFullConfig {
    contract: string;
    address: string;
}

interface IBindings {
    query?: string;
    create?: string;
    delete?: string;
    update?: string;
    read?: string;
}

interface ISourceServiceConfig {
    endpoint: string | IEndpointFullConfig;
    bindings?: IBindings;
    keyProperty?: string;
}


interface IHeaders {
    [key: string]: string | boolean;
}


interface IRequestParams {
    method: string;
    body: string | null;
    headers: IHeaders
}

class SourceService {
    protected _address: string = "http://localhost:8000/";
    protected _bindings: Required<IBindings> = {
        query: "list",
        create: "create",
        delete: "delete",
        update: "update",
        read: "read"
    };
    constructor(config: ISourceServiceConfig) {
        this._prepareAddress(config.endpoint);
        this._prepareBindings(config.bindings);
    }

    protected _prepareAddress(endpoint: string | IEndpointFullConfig): void {
        if (typeof endpoint === "string") {
            this._address += endpoint;
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
    }

    protected _prepareBindings(bindings?: IBindings): void {
        if (!bindings) {
            return;
        }

        this._bindings = {
            ...this._bindings,
            ...bindings
        };
    }

    public async call<RequestT, ResponseT>(
        url: string, request?: RequestT, methodType?: string, headers?: IHeaders
    ): Promise<ResponseT | null> {
        return this._sendRequest<RequestT, ResponseT>(url, request, methodType, headers);
    }

    protected async _sendRequest<RequestT, ResponseT>(url: string, request?: RequestT, methodType?: string, headers?: IHeaders): Promise<ResponseT | null> {
        const requestParams: IRequestParams = {
            method: methodType || "POST",
            body: null,
            headers: {
                "Content-Type": "application/json",
                ...headers
            }
        };

        if (request) {
            requestParams["body"] = JSON.stringify(request);
        }
        const response = await fetch(this._address + url, requestParams as RequestInit);

        if (this._hasError(response)) {
            return null;
        }

        return await response.json() as ResponseT;
    }

    protected _hasError(response: Response): boolean {
        if (response.ok) {
            return false;
        }

        console.log("При запросе произошла ошибка: " + response.statusText + " с кодом " + response.status);

        if (response.status === 401) {
            console.log("Ошибка аутентификации");
        }

        if (response.status === 403) {
            console.log("Ошибка доступа");
        }

        return true
    }
}

export default SourceService;