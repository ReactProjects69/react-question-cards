import cls from './HomePage.module.css';
import { API_URL } from '../../constants';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.ts';
import { QuestionCardType } from '../../models/QuestionCardType.ts';
import { SearchInput } from '../../components/SearchInput';

export function HomePage() {
    const [questions, setQuestions] = useState<QuestionCardType[]>([]);
    const [search, setSearch] = useState('');
    const [sortSelectValue, setSortSelectValue] = useState('');

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions: QuestionCardType[] = await response.json();

        setQuestions(questions);
        return questions;
    });

    const cards = useMemo(() => {
        return questions.filter((question: QuestionCardType) =>
            question.question.toLowerCase().includes(search.trim().toLowerCase()),
        );
    }, [questions, search]);

    useEffect(() => {
        getQuestions(`react?${sortSelectValue}`);
    }, [sortSelectValue]);

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortSelectValue(e.target.value);
    };

    return (
        <>
            <div className={cls.controlsContainer}>
                <SearchInput value={search} onChange={onSearchChangeHandler} />

                <select
                    value={sortSelectValue}
                    onChange={onSortChangeHandler}
                    className={cls.select}
                >
                    <option value="">sort By</option>
                    <hr />
                    <option value={`_sort=level`}>level ASC</option>
                    <option value={`_sort=-level`}>level DESC</option>
                    <option value={`_sort=completed`}>completed ASC</option>
                    <option value={`_sort=-completed`}>completed DESC</option>
                </select>
            </div>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            {cards.length == 0 && <p className={cls.noCardsInfo}>No Cards ...</p>}

            <QuestionCardList cards={cards} />
        </>
    );
}
