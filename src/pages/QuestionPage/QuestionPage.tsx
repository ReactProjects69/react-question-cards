import cls from './QuestionPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { ChangeEvent, useEffect, useId, useState } from 'react';
import { useFetch } from '../../hooks/useFetch.ts';
import { API_URL } from '../../constants';
import { QuestionCardType } from '../../models/QuestionCardType.ts';
import { Loader } from '../../components/Loader';
import { SmallLoader } from '../../components/SmallLoader';

export function QuestionPage() {
    const checkboxId = useId();
    const navigate = useNavigate();
    const { id } = useParams();

    const [card, setCard] = useState<QuestionCardType | null>(null);
    const [isChecked, setChecked] = useState(false);

    const levelVariant = () => {
        if (!card) return 'primary';
        return card.level === 1 ? 'primary' : card.level === 2 ? 'warning' : 'alert';
    };

    const completedVariant = () => {
        if (!card) return 'primary';
        return card.completed ? 'success' : 'primary';
    };

    const [updateCard, isCardUpdating] = useFetch(async (isChecked: boolean) => {
        const response = await fetch(`${API_URL}/react/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: isChecked,
            }),
        });
        const card: QuestionCardType = await response.json();

        setCard(card);
    });

    const [fetchCard, isCardLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${id}`);
        const card: QuestionCardType = await response.json();

        setCard(card);
    });

    useEffect(() => {
        fetchCard(null);
    }, []);

    useEffect(() => {
        if (card) setChecked(card?.completed);
    }, [card]);

    const onCheckboxChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        updateCard(event.target.checked);
    };

    if (isCardLoading) {
        return <Loader />;
    }

    // If there's no card data, show a message or redirect
    if (card === null) {
        return (
            <div className={cls.container}>
                <h5 className={cls.cardTitle}>No question data available</h5>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </div>
        );
    }

    return (
        <div className={cls.container}>
            <div className={cls.cardLabels}>
                <Badge variant={levelVariant()}>Level: {card.level}</Badge>
                <Badge variant={completedVariant()}>
                    {card.completed ? 'Completed' : 'Not Completed'}
                </Badge>

                {card.editDate && <p className={cls.editDate}>Edited: {card.editDate} </p>}
            </div>

            <h5 className={cls.cardTitle}>{card.question}</h5>
            <p className={cls.cardDescription}>{card.description}</p>

            <div className={cls.cardAnswers}>
                <label>Short Answers</label>
                <p className={cls.cardAnswer}>{card.answer}</p>
            </div>

            <ul className={cls.cardResources}>
                Resources:
                {card.resources.map((r, index) => {
                    return (
                        <li key={index}>
                            <a href={r.trim()} target={'_blank'} rel="noreferrer">
                                {r.trim()}
                            </a>
                        </li>
                    );
                })}
            </ul>

            <label htmlFor={checkboxId} className={cls.cardCheckbox}>
                <input
                    type="checkbox"
                    id={checkboxId}
                    checked={isChecked}
                    className={cls.checkbox}
                    onChange={onCheckboxChangeHandler}
                    disabled={isCardUpdating}
                />
                <span>mark question if completed</span>

                {isCardUpdating && <SmallLoader />}
            </label>

            <Button
                onClick={() => navigate(`/editquestion/${card.id}`)}
                isDisabled={isCardUpdating}
            >
                Edit Question
            </Button>
            <Button onClick={() => navigate('/')} isDisabled={isCardUpdating}>
                Back
            </Button>
        </div>
    );
}
