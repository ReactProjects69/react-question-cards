import ReactLogo from '../../assets/react.svg';
import { Button } from '../Button';
import cls from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';
import { AUTH_STORAGE } from '../../constants';

export function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, (!isAuthenticated).toString());
        setIsAuthenticated(!isAuthenticated);
    };

    return (
        <header className={cls.header}>
            <p onClick={() => navigate('/')}>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.headerButtons}>
                {isAuthenticated && <Button onClick={() => navigate('/addquestion')}>Add</Button>}
                <Button onClick={loginHandler} isActive={!isAuthenticated}>
                    {isAuthenticated ? 'Logout' : 'Login'}
                </Button>
            </div>
        </header>
    );
}
