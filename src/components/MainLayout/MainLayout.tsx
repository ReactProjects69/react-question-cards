import cls from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loader } from '../Loader';

export function MainLayout() {
    const currentYear: number = new Date().getFullYear();

    return (
        <>
            <div className={cls.mainLayout}>
                <Header />
                <div className={cls.mainWrapper}>
                    <main className={cls.main}>
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
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
