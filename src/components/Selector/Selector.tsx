import { ChangeEvent } from 'react';
import cls from './Selector.module.css';
import { SelectorOption } from '../../models/SelectorOption.ts';

type SelectorProps = {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    header: string;
    headerDisabled: boolean;
    options?: SelectorOption[];
    className?: string;
    defaultVault?: string;
};

export function Selector(props: SelectorProps) {
    return (
        <select
            value={props.value}
            onChange={props.onChange}
            className={props.className || cls.selector}
            id={props.id}
            name={props.name}
            defaultValue={props.value}
        >
            <option disabled={props.headerDisabled} value="">
                {props.header}
            </option>
            <hr />
            {props.options?.map((optionValue) => {
                return (
                    <option key={optionValue.value} value={optionValue.value}>
                        {optionValue.content}
                    </option>
                );
            })}
        </select>
    );
}
