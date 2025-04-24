import cls from './QuestionCard.module.css';
import { Button } from '../Button';

export function QuestionCard() {
    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <div>Level: 1</div>
                <div>Not Completed</div>
            </div>

            <h5 className={cls.cardTitle}>WTF</h5>

            <div className={cls.cardAnswers}>
                <label>Short Answers</label>
                <p className={cls.cardAnswer}>
                    KJOjoijoiJo ijoijo iJ[oIjOIJoi[joijo i[jOIjox ijKHU HGUYFTRd dSZfCGfYGc fDXjOIj
                    oxijKHUHG UYFTRdr dSZfCGfYGcfDX jOIjoxijKHUHGUY FTRdrdSZf CGfYGcfDX
                </p>

                <Button onClick={() => {}}>View</Button>
            </div>
        </div>
    );
}
