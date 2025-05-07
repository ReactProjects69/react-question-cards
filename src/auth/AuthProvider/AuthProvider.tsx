import { createContext, ReactNode, useState } from 'react';
import { AuthContextType } from '../../models/AuthContextType.ts';
import { AUTH_STORAGE } from '../../constants';

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {
        return {};
    },
});

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) ?? 'false') == true;
    const [isAuthenticated, setIsAuthenticated] = useState(isLogin);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
