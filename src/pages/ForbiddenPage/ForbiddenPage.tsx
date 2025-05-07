import cls from './ForbiddenPage.module.css';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.ts';

export function ForbiddenPage() {
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const { isAuthenticated } = useAuth();

    const fromPage: string = location?.state?.from ?? '/';

    useEffect(() => {
        if (isAuthenticated) navigate(fromPage, { replace: true });
    }, [isAuthenticated]);

    return <h2 className={cls.title}>Page is Forbidden!</h2>;
}
