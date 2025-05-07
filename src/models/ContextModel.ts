import { Dispatch, SetStateAction } from 'react';

export class ContextModel<T> {
    value: T;

    setValue: Dispatch<SetStateAction<T>> = () => {
        return {};
    };

    constructor(value: T) {
        this.value = value;
    }
}
