import cls from './MainLayout.module.css';

export function MainLayout() {
    const currentYear: number = new Date().getFullYear();

    return (
        <div className={cls.mainLayout}>
            <header>Header</header>
            <div className={cls.mainWrapper}>
                <main className={cls.main}>Main</main>
                <footer className={cls.footer}>
                    React Question Card Application | {currentYear} <br />
                    by Alex 69
                </footer>
            </div>
        </div>
    );
}
