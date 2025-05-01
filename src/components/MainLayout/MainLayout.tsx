import cls from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { ToastContainer } from 'react-toastify';

export function MainLayout() {
    const currentYear: number = new Date().getFullYear();

    return (
        <>
            <div className={cls.mainLayout}>
                <Header />
                <div className={cls.mainWrapper}>
                    <main className={cls.main}>
                        <Outlet />
                    </main>
                    <footer className={cls.footer}>
                        React Question Card Application | {currentYear} <br />
                        by Alex 69
                    </footer>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}
