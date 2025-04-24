import cls from './NotFoundPage.module.css';

export function NotFoundPage() {
    return (
        <>
            <h2 className={cls.title}>Not Found Page</h2>
            <h1 className={cls.errorCode}>404</h1>
        </>
    );
}
