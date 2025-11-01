import type {InputTypeHTMLAttribute} from "vue";

/**
 * Интерфейс для пропсов базового компонента поля ввода
 *
 * @interface IBaseInputProps
 *
 * @description
 * Определяет все возможные свойства для компонента базового поля ввода,
 * включая основные HTML атрибуты input элемента и дополнительные свойства
 * для кастомизации внешнего вида и поведения.
 *
 * @example
 * ```typescript
 * // Базовое использование
 * const props: IBaseInputProps = {
 *     name: "email",
 *     title: "Email адрес",
 *     value: "",
 *     placeholder: "Введите ваш email"
 * };
 *
 * // Расширенное использование с иконками и валидацией
 * const advancedProps: IBaseInputProps = {
 *     name: "password",
 *     title: "Пароль",
 *     type: "password",
 *     value: "",
 *     icon: "lock",
 *     afterIcon: "eye",
 *     required: true,
 *     minlength: 8,
 *     error: "Пароль слишком короткий"
 * };
 * ```
 */
interface IBaseInputProps {
    /**
     * Уникальное имя поля ввода.
     * Используется для атрибута `name` input элемента и как идентификатор для label.
     *
     * @type {string}
     * @required
     *
     * @example
     * ```typescript
     * name: "username"
     * ```
     */
    name: string;

    /**
     * Заголовок поля ввода, отображаемый в label.
     *
     * @type {string}
     * @required
     *
     * @example
     * ```typescript
     * title: "Имя пользователя"
     * ```
     */
    title: string;

    /**
     * Флаг, определяющий отображение label элемента.
     * Если `false`, label будет скрыт визуально, но останется доступным для screen readers.
     *
     * @type {boolean}
     * @optional
     * @default true
     *
     * @example
     * ```typescript
     * hasLabel: false // скрыть видимый label
     * ```
     */
    hasLabel?: boolean;

    /**
     * Название иконки FontAwesome для отображения перед полем ввода.
     * Иконка будет отрендерена как `<i class="fa fa-{icon}"></i>`
     *
     * @type {string}
     * @optional
     *
     * @example
     * ```typescript
     * icon: "user"      // → fa-user
     * icon: "envelope"  // → fa-envelope
     * icon: "lock"      // → fa-lock
     * ```
     */
    icon?: string;

    /**
     * Название иконки FontAwesome для отображения после поля ввода.
     * Часто используется для иконок действий (глаз для переключения видимости пароля и т.д.)
     *
     * @type {string}
     * @optional
     *
     * @example
     * ```typescript
     * afterIcon: "eye"        // переключение видимости пароля
     * afterIcon: "search"     // поиск
     * afterIcon: "calendar"   // выбор даты
     * ```
     */
    afterIcon?: string;

    /**
     * Текст placeholder, отображаемый в пустом поле ввода.
     *
     * @type {string}
     * @optional
     *
     * @example
     * ```typescript
     * placeholder: "Введите ваш email"
     * placeholder: "Минимум 8 символов"
     * ```
     */
    placeholder?: string;

    /**
     * Тип поля ввода.
     * Поддерживает все стандартные HTML типы input + кастомный тип "password".
     *
     * @type {InputTypeHTMLAttribute | "password" | "text"}
     * @optional
     * @default "text"
     *
     * @example
     * ```typescript
     * type: "email"       // для email адресов
     * type: "password"    // для паролей (с маскировкой)
     * type: "tel"         // для телефонных номеров
     * type: "number"      // для числовых значений
     * ```
     */
    type?: InputTypeHTMLAttribute | "password" | "text";

    /**
     * Текущее значение поля ввода.
     *
     * @type {string}
     * @required
     *
     * @example
     * ```typescript
     * value: "example@mail.com"
     * value: "123456"
     * ```
     */
    value: string;

    /**
     * Флаг, указывающий что поле ввода заблокировано для редактирования.
     *
     * @type {boolean}
     * @optional
     * @default false
     *
     * @example
     * ```typescript
     * disabled: true // поле недоступно для ввода
     * ```
     */
    disabled?: boolean;

    /**
     * Флаг, указывающий что поле ввода доступно только для чтения.
     * В отличие от `disabled`, поле доступно для фокуса и выделения текста.
     *
     * @type {boolean}
     * @optional
     * @default false
     *
     * @example
     * ```typescript
     * readonly: true // можно выделить текст, но нельзя редактировать
     * ```
     */
    readonly?: boolean;

    /**
     * Атрибут autocomplete для управления автозаполнением браузера.
     *
     * @type {string}
     * @optional
     *
     * @example
     * ```typescript
     * autocomplete: "email"           // автозаполнение email
     * autocomplete: "current-password" // автозаполнение текущего пароля
     * autocomplete: "new-password"     // предложение нового пароля
     * autocomplete: "off"             // отключение автозаполнения
     * ```
     */
    autocomplete?: string;

    /**
     * Максимальное количество символов, разрешенное для ввода.
     *
     * @type {number}
     * @optional
     *
     * @example
     * ```typescript
     * maxlength: 50 // не более 50 символов
     * ```
     */
    maxlength?: number;

    /**
     * Минимальное количество символов, необходимое для валидного значения.
     *
     * @type {number}
     * @optional
     *
     * @example
     * ```typescript
     * minlength: 3 // минимум 3 символа
     * ```
     */
    minlength?: number;

    /**
     * Флаг, указывающий что поле обязательно для заполнения.
     *
     * @type {boolean}
     * @optional
     * @default false
     *
     * @example
     * ```typescript
     * required: true // поле обязательно к заполнению
     * ```
     */
    required?: boolean;

    /**
     * Сообщение об ошибке валидации.
     * Если передано, поле будет отображаться в состоянии ошибки.
     *
     * @type {string}
     * @optional
     *
     * @example
     * ```typescript
     * error: "Поле обязательно для заполнения"
     * error: "Email имеет неверный формат"
     * error: "Пароль слишком короткий"
     * ```
     */
    error?: string;

    /**
     * Флаг, указывающий на успешную валидацию поля.
     * Если `true`, поле будет отображаться в состоянии успеха.
     *
     * @type {boolean}
     * @optional
     * @default false
     *
     * @example
     * ```typescript
     * success: true // поле валидно и успешно прошло проверку
     * ```
     */
    success?: boolean;
    additionalClass?: string;
}

export {IBaseInputProps};