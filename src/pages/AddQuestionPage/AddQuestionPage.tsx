import cls from './AddQuestionPage.module.css';
import { useActionState } from 'react';
import { delayFn } from '../../helpers/delayFn.tsx';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { Loader } from '../../components/Loader';
import { FormState } from '../../models/FormState.ts';
import { QuestionForm } from '../../components/QuestionForm';

const createCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        await delayFn();
        const newQuestion = Object.fromEntries(formData);
        const resources = newQuestion.resources.toString().trim();
        const isClearForm = Boolean(newQuestion.clearForm);

        const response = await fetch(`${API_URL}/react`, {
            method: 'POST',
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(',').map((p) => p.trim()) : [],
                level: Number(newQuestion.level),
                completed: false,
                editDate: undefined,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const question = await response.json();
        toast.success('Question added successfully');

        return isClearForm ? {} : question;
    } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        return { clearForm: false };
    }
};

const AddQuestionPage = () => {
    const [formState, formAction, isPending] = useActionState<FormState, FormData>(
        createCardAction,
        {
            clearForm: true,
        },
    );

    if (isPending) {
        return <Loader />;
    }

    return (
        <>
            <h1 className={cls.formTitle}>Add New Question</h1>

            <div className={cls.formContainer}>
                <QuestionForm
                    action={formAction}
                    state={formState}
                    isPending={isPending}
                    submitBtnText={'Add Question'}
                />
            </div>
        </>
    );
};

export default AddQuestionPage;
