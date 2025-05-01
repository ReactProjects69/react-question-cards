import { useState } from 'react';
import { delayFn } from '../helpers/delayFn.tsx';

// Тип для функции обратного вызова
type CallbackFunction<T, TP> = (arg: TP) => Promise<T>;

// Тип возвращаемого значения из хука
type UseFetchReturn<T, TP> = [
    fetchFunction: (arg: TP) => Promise<T | undefined>,
    isLoading: boolean,
    error: string | null,
];

/**
 * Хук useFetch для выполнения асинхронных запросов
 * @param callback - Функция для выполнения запроса
 * @returns Кортеж с функцией запроса, состоянием загрузки и ошибкой
 */
export const useFetch = <T, TP>(callback: CallbackFunction<T, TP>): UseFetchReturn<T, TP> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFn = async (arg: TP): Promise<T | undefined> => {
        try {
            setIsLoading(true);
            setError(null);
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
