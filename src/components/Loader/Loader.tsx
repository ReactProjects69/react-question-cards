import cls from './Loader.module.css';

export function Loader() {
    return (
        <div className={cls.backdrop}>
            <span className={cls.loader}></span>
        </div>
    );
}
