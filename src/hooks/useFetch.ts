import { useState } from 'react';
import { delayFn } from '../helpers/delayFn.tsx';

// Тип для функции обратного вызова
type CallbackFunction<T> = (url: string) => Promise<T>;

// Тип возвращаемого значения из хука
type UseFetchReturn<T> = [
    fetchFunction: (arg: any) => Promise<T | undefined>,
    isLoading: boolean,
    error: string,
];

/**
 * Хук useFetch для выполнения асинхронных запросов
 * @param callback - Функция для выполнения запроса
 * @returns Кортеж с функцией запроса, состоянием загрузки и ошибкой
 */
export const useFetch = <T>(callback: CallbackFunction<T>): UseFetchReturn<T> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchFn = async (arg: string): Promise<T | undefined> => {
        try {
            setIsLoading(true);
            setError('');
            await delayFn();

            return await callback(arg);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
            setError(errorMessage);
            return undefined;
        } finally {
            setIsLoading(false);
        }
    };

    return [fetchFn, isLoading, error];
};
