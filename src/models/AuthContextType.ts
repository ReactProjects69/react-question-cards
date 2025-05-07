import { Dispatch, SetStateAction } from 'react';

export class AuthContextType {
    isAuthenticated: boolean = false;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>> = () => {
        return {};
    };
}
