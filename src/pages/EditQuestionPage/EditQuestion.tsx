import cls from './EditQuestionPage.module.css';
import { useActionState } from 'react';
import { FormState } from '../../models/FormState.ts';
import { Loader } from '../../components/Loader';
import { QuestionForm } from '../../components/QuestionForm';
import { QuestionCardType } from '../../models/QuestionCardType.ts';
import { delayFn } from '../../helpers/delayFn.tsx';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';
import { dateFormat } from '../../helpers/dateFormat.ts';
import { useFetch } from '../../hooks/useFetch.ts';
import { useNavigate } from 'react-router-dom';

type EditQuestionProps = {
    initialState?: QuestionCardType;
};

const editCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        await delayFn();

        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.toString().trim();
        const questionId = newQuestion.questionId.toString();
        const isClearForm = Boolean(newQuestion.clearForm);

        const response = await fetch(`${API_URL}/react/${questionId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(',').map((p) => p.trim()) : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: dateFormat(new Date()),
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const question = await response.json();
        toast.success('The question edited successfully');

        return isClearForm ? {} : question;
    } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        return { clearForm: false };
    }
};

export const EditQuestion = ({ initialState }: EditQuestionProps) => {
    const navigate = useNavigate();

    const [formState, formAction, isPending] = useActionState<FormState, FormData>(editCardAction, {
        ...initialState,
        clearForm: false,
    });

    const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
        await fetch(`${API_URL}/react/${initialState?.id}`, {
            method: 'DELETE',
        });

        toast.success('The question successfully removed');
        navigate('/');
    });

    const onRemoveQuestion = async () => {
        const isRemove = confirm('Are you sure you want to remove this question?');

        if (isRemove) {
            await removeQuestion(null);
        }
    };

    if (isPending || isQuestionRemoving) {
        return <Loader />;
    }

    return (
        <>
            <h1 className={cls.formTitle}>Edit Question</h1>

            <div className={cls.formContainer}>
                <button className={cls.removeBtn} disabled={isPending} onClick={onRemoveQuestion}>
                    X
                </button>

                <QuestionForm
                    action={formAction}
                    state={formState}
                    isPending={isPending}
                    submitBtnText={'Edit Question'}
                />
            </div>
        </>
    );
};
