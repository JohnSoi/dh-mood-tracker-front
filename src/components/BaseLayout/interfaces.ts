import {Ref} from "vue";

interface BaseLayoutProps {
    appName: string;
    menuMinimize: boolean;
    theme: 'light' | 'dark';
}

interface BaseLayoutEmits {
    (e: 'menu-toggle', collapsed: boolean): void

    (e: 'theme-change', theme: 'light' | 'dark'): void
}

interface UseBaseLayoutReturn {
    isMenuMinimize: Ref<boolean>
    currentTheme: Ref<'light' | 'dark'>
    toggleMenu: () => void
    toggleTheme: () => void
    minimizeAppName: () => string
}

export {
    BaseLayoutProps,
    BaseLayoutEmits,
    UseBaseLayoutReturn
}
