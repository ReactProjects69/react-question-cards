import cls from './HomePage.module.css';
import { API_URL } from '../../constants';
import * as React from 'react';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.ts';
import { QuestionCardType } from '../../models/QuestionCardType.ts';
import { SearchInput } from '../../components/SearchInput';
import { PaginationResult } from '../../models/PaginationResult.ts';
import { Button } from '../../components/Button';

const DEFAULT_PER_PAGE = 10;

export function HomePage() {
    const [searchParams, setSearchParams] = useState<string>(
        `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
    );
    const [paginationResult, setPaginationResult] = useState<PaginationResult | null>(null);
    const [search, setSearch] = useState('');
    const [sortSelectValue, setSortSelectValue] = useState('');

    const controlsContainerRef = useRef<HTMLDivElement>(null);

    const getActivePageNumber = () =>
        paginationResult?.next == null ? paginationResult?.last : paginationResult.next - 1;

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions: PaginationResult = await response.json();

        setPaginationResult(questions);
        return questions;
    });

    const cards = useMemo(() => {
        if (paginationResult?.data) {
            if (search.trim()) {
                return paginationResult.data.filter((question: QuestionCardType) =>
                    question.question.toLowerCase().includes(search.trim().toLowerCase()),
                );
            } else {
                return paginationResult.data;
            }
        }
        return [];
    }, [paginationResult, search]);

    const pagination = useMemo(() => {
        const totalCardCount = paginationResult?.pages || 0;
        return Array(totalCardCount)
            .fill(0)
            .map((_, i) => i + 1);
    }, [paginationResult]);

    useEffect(() => {
        getQuestions(`react${searchParams}`);
    }, [searchParams]);

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortSelectValue(e.target.value);
        setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
    };

    const paginationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        if (target.tagName === 'BUTTON') {
            setSearchParams(
                `?_page=${target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`,
            );
            controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

            <QuestionCardList cards={cards} />

            {cards.length == 0 ? (
                <p className={cls.noCardsInfo}>No Cards ...</p>
            ) : (
                <div className={cls.paginationContainer} onClick={paginationHandler}>
                    {pagination.map((value) => {
                        return (
                            <Button key={value} isActive={value == getActivePageNumber()}>
                                {value}
                            </Button>
                        );
                    })}
                </div>
            )}
        </>
    );
}
