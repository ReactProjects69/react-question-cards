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
import { databaseQueryFactory } from '../../helpers/databaseQueryFactory.ts';
import { Selector } from '../../components/Selector';

const DEFAULT_PER_PAGE = 10;

export function HomePage() {
    const [searchParams, setSearchParams] = useState<string>(
        `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
    );
    const [paginationResult, setPaginationResult] = useState<PaginationResult | null>(null);
    const [search, setSearch] = useState('');
    const [sortSelectValue, setSortSelectValue] = useState('');
    const [countSelectValue, setCountSelectValue] = useState('');

    const controlsContainerRef = useRef<HTMLDivElement>(null);

    const getActivePageNumber = () =>
        paginationResult?.next == null ? paginationResult?.last : paginationResult.next - 1;

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const paginationResult: PaginationResult = await response.json();

        setPaginationResult(paginationResult);
        return paginationResult;
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
        setSearchParams(databaseQueryFactory('1', countSelectValue, e.target.value));
    };

    const paginationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;

        console.log(target.textContent);

        if (target.tagName === 'BUTTON') {
            setSearchParams(
                databaseQueryFactory(
                    target.textContent?.toString() ?? '',
                    countSelectValue,
                    sortSelectValue,
                ),
            );
            controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onCountSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCountSelectValue(e.target.value);

        setSearchParams(databaseQueryFactory('1', e.target.value, sortSelectValue));
    };

    return (
        <>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
                <SearchInput value={search} onChange={onSearchChangeHandler} />

                <Selector
                    header={'sort By'}
                    headerDisabled={false}
                    onChange={onSortChangeHandler}
                    options={[
                        { value: '_sort=level', content: 'level ASC' },
                        { value: '_sort=-level', content: 'level DESC' },
                        { value: '_sort=completed', content: 'completed ASC' },
                        { value: '_sort=-completed', content: 'completed DESC' },
                    ]}
                    value={sortSelectValue}
                />

                <Selector
                    header={'count'}
                    headerDisabled={true}
                    onChange={onCountSelectChangeHandler}
                    options={[
                        { value: '10', content: '10' },
                        { value: '20', content: '20' },
                        { value: '30', content: '30' },
                        { value: '50', content: '50' },
                        { value: '100', content: '100' },
                    ]}
                    value={countSelectValue}
                />
            </div>
            {isLoading && <Loader />}
            {error && <p>{error}</p>}

            <QuestionCardList cards={cards} />

            {cards.length == 0 ? (
                <p className={cls.noCardsInfo}>No Cards ...</p>
            ) : (
                pagination.length > 1 && (
                    <div className={cls.paginationContainer} onClick={paginationHandler}>
                        {pagination.map((value) => {
                            return (
                                <Button key={value} isActive={value == getActivePageNumber()}>
                                    {value}
                                </Button>
                            );
                        })}
                    </div>
                )
            )}
        </>
    );
}
