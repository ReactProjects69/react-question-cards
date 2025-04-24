﻿/*
import cls from './HomePage.module.css';
*/
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.ts';

export function HomePage() {
    const [questions, setQuestions] = useState([]);

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQuestions(questions);
        return questions;
    });

    /*const _getQuestions = async () => {
        try {
            setIsLoading(true);
            await delayFn();
            const response = await fetch(`${API_URL}/react`);
            const questions = await response.json();
            setQuestions(questions);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };*/

    useEffect(() => {
        getQuestions('react');
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </>
    );
}
