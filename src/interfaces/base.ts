/**
 * Интерфейс для пункта меню
 * @interface
 */
interface IMenuItem {
    /**
     * Уникальный ключ пункта меню
     * @type {string}
     */
    key: string;

    /**
     * Заголовок пункта меню, отображаемый пользователю
     * @type {string}
     */
    title: string;

    /**
     * Название иконки для пункта меню
     * @type {string}
     */
    icon: string;

    /**
     * URL путь для навигации
     * @type {string}
     */
    href: string;

    /**
     * Функция для ленивой загрузки компонента Vue
     * @type {() => Promise<any>}
     */
    component: () => Promise<any>;

    /**
     * Флаг для отображения страницы без аутентификации
     * @type {boolean}
     */
    public?: boolean;
}

interface IApiError {
    status: number;
    details: string;
    retryCallback?: () => Promise<void>;
    showRetry?: boolean;
}

export {IMenuItem, IApiError};