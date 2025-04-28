/*
import cls from './HomePage.module.css';
*/
import { API_URL } from '../../constants';
import { ChangeEvent, useEffect, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.ts';
import { QuestionCardType } from '../../models/QuestionCardType.ts';

export function HomePage() {
    const [questions, setQuestions] = useState<QuestionCardType[]>([]);
    const [search, setSearch] = useState('');

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions: QuestionCardType[] = await response.json();

        setQuestions(questions);
        return questions;
    });

    useEffect(() => {
        getQuestions('react');
    }, []);

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    return (
        <>
            <input type={'text'} value={search} onChange={onSearchChangeHandler} />

            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </>
    );
}
