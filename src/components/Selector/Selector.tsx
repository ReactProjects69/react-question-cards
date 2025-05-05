import { ChangeEvent, SelectHTMLAttributes } from 'react';
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
    defaultValue?: string;
};

export function Selector(props: SelectorProps) {
    const { id, name, value, onChange, header, headerDisabled, options, className, defaultValue } =
        props;

    const selectProps: SelectHTMLAttributes<HTMLSelectElement> = {
        onChange,
        className: className || cls.selector,
        id,
        name,
    };

    if (value !== undefined) {
        selectProps.value = value;
    } else if (defaultValue !== undefined) {
        selectProps.defaultValue = defaultValue;
    }

    return (
        <select {...selectProps}>
            <option disabled={headerDisabled} value="">
                {header}
            </option>
            {options?.map((optionValue) => (
                <option key={optionValue.value} value={optionValue.value}>
                    {optionValue.content}
                </option>
            ))}
        </select>
    );
}
