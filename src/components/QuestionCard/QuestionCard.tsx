import cls from './QuestionCard.module.css';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../Badge';
import { QuestionCardType } from '../../models/QuestionCardType';

type QuestionCardProps = {
    card: QuestionCardType;
};

export function QuestionCard({ card }: QuestionCardProps) {
    const navigate = useNavigate();

    const levelVariant: 'primary' | 'warning' | 'alert' =
        card.level == 1 ? 'primary' : card.level == 2 ? 'warning' : 'alert';

    const completedVariant: 'primary' | 'success' = card.completed ? 'success' : 'primary';

    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <Badge variant={levelVariant}>Level: {card.level}</Badge>
                <Badge variant={completedVariant}>
                    {card.completed ? 'Completed' : 'Not Completed'}
                </Badge>
            </div>

            <h5 className={cls.cardTitle}>{card.question}</h5>

            <div className={cls.cardAnswers}>
                <label>Short Answers</label>
                <p className={cls.cardAnswer}>{card.answer}</p>

                <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
            </div>
        </div>
    );
}
