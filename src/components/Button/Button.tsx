import cls from './Button.module.css';
import { ButtonProps } from './ButtonProps.ts';

export function Button(props: ButtonProps) {
    return (
        <>
            <button
                className={`${cls.btn} ${props.isActive ? cls.active : ''}`}
                onClick={props.onClick}
                disabled={props.isDisabled}
            >
                {props.children}
            </button>
        </>
    );
}
