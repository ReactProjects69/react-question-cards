import ReactLogo from '../../assets/react.svg';
import { Button } from '../Button';
import cls from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';
import { AUTH_STORAGE } from '../../constants';
import { ThemeToggler } from '../../feature/ThemeToggler';

export function Header() {
    const navigate = useNavigate();
    const { value, setValue } = useAuth();

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, (!value).toString());
        setValue(!value);
    };

    return (
        <header className={cls.header}>
            <p onClick={() => navigate('/')}>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.headerButtons}>
                <ThemeToggler />
                {value && <Button onClick={() => navigate('/addquestion')}>Add</Button>}
                <Button onClick={loginHandler} isActive={!value}>
                    {value ? 'Logout' : 'Login'}
                </Button>
            </div>
        </header>
    );
}
