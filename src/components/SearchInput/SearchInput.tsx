import cls from './SearchInput.module.css';
import { ChangeEvent, useId } from 'react';
import { SearchIcon } from '../icons.tsx';

type SearchInputProps = {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
    const inputId = useId();

    return (
        <div className={cls.inputContainer}>
            <label htmlFor={inputId}>
                <SearchIcon className={cls.searchIcon} />
            </label>
            <input
                id={inputId}
                type={'text'}
                value={value}
                onChange={onChange}
                className={cls.input}
                placeholder={'Search'}
            />
        </div>
    );
}
