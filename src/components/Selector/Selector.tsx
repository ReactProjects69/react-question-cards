import { ChangeEvent } from 'react';
import cls from './Selector.module.css';
import { SelectorOption } from '../../models/SelectorOption.ts';

type SelectorProps = {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    header: string;
    headerDisabled: boolean;
    options?: SelectorOption[];
};

export function Selector(props: SelectorProps) {
    return (
        <select value={props.value} onChange={props.onChange} className={cls.selector}>
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
