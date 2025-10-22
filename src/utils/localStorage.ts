function loadFromStorage(): boolean {
    try {
        const stored = localStorage.getItem('menu-expanded');
        return stored ? JSON.parse(stored) : true;
    } catch {
        return true;
    }
}

function saveToStorage(value: boolean): void {
    try {
        localStorage.setItem('menu-expanded', JSON.stringify(value))
    } catch (error) {
        console.error('Failed to save menu state:', error)
    }
}

export {loadFromStorage, saveToStorage};
