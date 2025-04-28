import cls from './QuestionCardList.module.css';
import { QuestionCard } from '../QuestionCard';
import { memo } from 'react';
import { QuestionCardType } from '../../models/QuestionCardType.ts';

type QuestionCardListProps = {
    cards: QuestionCardType[];
};

export const QuestionCardList = memo(({ cards }: QuestionCardListProps) => {
    return (
        <div className={cls.cardList}>
            {cards.map((card, index) => (
                <QuestionCard card={card} key={card.id || index} />
            ))}
        </div>
    );
});
