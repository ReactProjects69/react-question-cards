import { createContext, ReactNode, useState } from 'react';
import { AUTH_STORAGE } from '../../constants';
import { ContextModel } from '../../models/ContextModel.ts';

export const AuthContext = createContext<ContextModel<boolean>>({
    value: false,
    setValue: () => {
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
        <AuthContext.Provider value={{ value: isAuthenticated, setValue: setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
