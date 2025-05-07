import { ThemeContext } from '../theme/ThemeProvider/ThemeProvider.tsx';
import { useContext } from 'react';

export const useTheme = () => {
    return useContext(ThemeContext);
};
