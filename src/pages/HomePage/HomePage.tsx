/*
import cls from './HomePage.module.css';
*/
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';

export function HomePage() {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await fetch(`${API_URL}/react`);
            const questions = await response.json();
            setQuestions(questions);
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getQuestions().then(() => {});
    }, []);

    return (
        <>
            <QuestionCardList cards={questions} />
        </>
    );
}
