import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch.ts';
import { API_URL } from '../../constants';
import { QuestionCardType } from '../../models/QuestionCardType.ts';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { EditQuestion } from './EditQuestion.tsx';

export function EditQuestionPage() {
    const { id } = useParams();
    const [question, setQuestion] = useState<QuestionCardType | null>(null);

    const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react/${id}`, {});
        const data: QuestionCardType = await response.json();

        setQuestion(data);
    });

    useEffect(() => {
        fetchQuestion(null);
    }, []);

    if (isQuestionLoading) {
        return <Loader />;
    }

    return <>{question && <EditQuestion initialState={question} />}</>;
}
