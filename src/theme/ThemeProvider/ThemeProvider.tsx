import { createContext, ReactNode, useLayoutEffect, useState } from 'react';
import { ContextModel } from '../../models/ContextModel.ts';
import { THEME_STORAGE } from '../../constants';

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeContext = createContext<ContextModel<string>>({
    value: '',
    setValue: () => {
        return {};
    },
});

export function ThemeProvider({ children }: ThemeProviderProps) {
    const savedTheme = localStorage.getItem(THEME_STORAGE) ?? 'light';
    const [theme, setTheme] = useState(savedTheme);

    useLayoutEffect(() => {
        const detectTheme = () => {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
                setTheme('dark');
                document.body.classList.remove('darkLayout');
            } else {
                if (savedTheme === 'dark') document.body.classList.add('darkLayout');
                setTheme(savedTheme);
            }
        };
        detectTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        mediaQuery.addEventListener('change', detectTheme);

        return () => {
            mediaQuery.removeEventListener('change', detectTheme);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ value: theme, setValue: setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
