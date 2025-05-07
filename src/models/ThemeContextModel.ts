import { Dispatch, SetStateAction } from 'react';

export class ThemeContextModel {
    theme: string = '';
    setTheme: Dispatch<SetStateAction<string>> = () => {
        return {};
    };
}
