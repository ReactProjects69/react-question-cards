import cls from './QuestionForm.module.css';
import { Selector } from '../Selector';
import { Button } from '../Button';
import { FormState } from '../../models/FormState.ts';

type QuestionFormProps = {
    action: (payload: FormData) => void;
    state: FormState;
    isPending: boolean;
    submitBtnText: string;
};

export function QuestionForm({ action, state, isPending, submitBtnText }: QuestionFormProps) {
    return (
        <form action={action} className={cls.form}>
            <input type={'text'} hidden defaultValue={state.id} name={'questionId'} />
            <div className={cls.formControl}>
                <label htmlFor="questionField">Question: </label>
                <textarea
                    defaultValue={state.question}
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
                    defaultValue={state.answer}
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
                    defaultValue={state.description}
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
                    defaultValue={state.resources?.join(', ')}
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
                    defaultValue={state.level?.toString()}
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
                    defaultChecked={state.clearForm}
                />
                <span>Clear Form after submitting?</span>
            </label>

            <Button isDisabled={isPending}>{submitBtnText}</Button>
        </form>
    );
}
