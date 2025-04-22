import cls from './Button.module.css';

const isPrimary: boolean = true;

export function Button(props) {
    return (
        <>
            <button
                className={`${cls.btn} ${isPrimary ? cls.primary : ''}`}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </>
    );
}
