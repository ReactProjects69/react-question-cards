import cls from './AddQuestionPage.module.css';
import { Selector } from '../../components/Selector';
import { Button } from '../../components/Button';
import { useActionState } from 'react';
import { delayFn } from '../../helpers/delayFn.tsx';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { Loader } from '../../components/Loader';

type FormState = {
    clearForm?: boolean;
    question?: string;
    answer?: string;
    description?: string;
    resources?: string[];
    level?: number;
};

const createCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    try {
        await delayFn();
        console.log(Object.fromEntries(formData));
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

export function AddQuestionPage() {
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
                <form action={formAction} className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea
                            defaultValue={formState.question}
                            name="question"
                            id="questionField"
                            cols={30}
                            rows={2}
                            required={true}
                            placeholder="Enter Your Question"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="answerField">Short answer: </label>
                        <textarea
                            defaultValue={formState.answer}
                            name="answer"
                            id="answerField"
                            cols={30}
                            rows={2}
                            required={true}
                            placeholder="Enter Short Answer"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Description: </label>
                        <textarea
                            defaultValue={formState.description}
                            name="description"
                            id="descriptionField"
                            cols={30}
                            rows={5}
                            required={true}
                            placeholder="Enter Description"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Resources: </label>
                        <textarea
                            defaultValue={formState.resources?.join(', ')}
                            name="resources"
                            id="resourcesField"
                            cols={30}
                            rows={5}
                            placeholder="Enter Resources separated by commas"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="levelField">Level: </label>
                        <Selector
                            name="level"
                            id="levelField"
                            header={'Question Level'}
                            headerDisabled={true}
                            defaultVault={formState.level?.toString()}
                            options={[
                                { value: '1', content: '1 - easiest' },
                                { value: '2', content: '2 - medium' },
                                { value: '3', content: '3 - hardest' },
                            ]}
                        />
                    </div>

                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input
                            className={cls.checkbox}
                            type="checkbox"
                            name="clearForm"
                            id="clearFormField"
                            defaultChecked={formState.clearForm}
                        />
                        <span>Clear Form after submitting?</span>
                    </label>

                    <Button isDisabled={isPending}>Add Question</Button>
                </form>
            </div>
        </>
    );
}
