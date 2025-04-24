﻿import ReactLogo from '../../assets/react.svg';
import { Button } from '../Button';
import cls from './Header.module.css';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    return (
        <header className={cls.header}>
            <p onClick={() => navigate('/')}>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.headerButtons}>
                <Button isActive onClick={() => navigate('/addquestion')}>
                    Add
                </Button>
                <Button>Login</Button>
            </div>
        </header>
    );
}
