import { createContext, ReactNode, useState } from 'react';
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

    return (
        <ThemeContext.Provider value={{ value: theme, setValue: setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
