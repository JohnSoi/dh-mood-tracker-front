import {BaseLayoutProps, UseBaseLayoutReturn} from "./interfaces";
import {ref, watch} from "vue";


export function useBaseLayout(props: BaseLayoutProps, emit: (event: string, ...args: any[]) => void): UseBaseLayoutReturn {
    const isMenuMinimize = ref(props.menuMinimize || false);
    const currentTheme = ref(props.theme || 'light');

    // Переключение сайдбара
    const toggleMenu = (): void => {
        isMenuMinimize.value = !isMenuMinimize.value
        emit('sidebar-toggle', isMenuMinimize.value)
    }

    // Переключение темы
    const toggleTheme = (): void => {
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', currentTheme.value)
        emit('theme-change', currentTheme.value)
    }

    const minimizeAppName = (): string => {
        const appName = props.appName;
        let minimizeAppNameText = '';

        for (const symbol of appName) {
            if (/^[A-Z]+$/.test(symbol)) {
                minimizeAppNameText += symbol;
            }
            if (minimizeAppNameText.length === 2) {
                break;
            }
        }

        return minimizeAppNameText || appName;
    }

    // Наблюдатели
    watch(() => props.menuMinimize, (newVal) => {
        if (newVal !== undefined) {
            isMenuMinimize.value = newVal
        }
    })

    watch(() => props.theme, (newVal) => {
        if (newVal) {
            currentTheme.value = newVal
        }
    })

    return {
        isMenuMinimize,
        currentTheme,
        toggleMenu,
        toggleTheme,
        minimizeAppName
    }
}