interface IBaseButtonProps {
    title?: string;
    nativeType?: 'button' | 'submit' | 'reset';
    theme?: 'default' | 'accent' | 'warning' | 'error' | 'success' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    icon?: string;
    afterIcon?: string;
    disabled?: boolean;
    loading?: boolean;
    hideContentOnLoad?: boolean;
    block?: boolean;
    rounded?: boolean;
    outline?: boolean;
    badge?: string | number;
    badgeTheme?: 'default' | 'accent' | 'warning' | 'error';
}

interface IBaseButtonEmits {
    (e: 'click', event: MouseEvent): void;
    (e: 'mouseenter', event: MouseEvent): void;
    (e: 'mouseleave', event: MouseEvent): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
}

export {IBaseButtonEmits, IBaseButtonProps};