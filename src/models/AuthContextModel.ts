import { Dispatch, SetStateAction } from 'react';

export class AuthContextModel {
    isAuthenticated: boolean = false;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>> = () => {
        return {};
    };
}
