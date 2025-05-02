import cls from './AddQuestionPage.module.css';
import { Selector } from '../../components/Selector';
import { Button } from '../../components/Button';

export function AddQuestionPage() {
    return (
        <>
            <h1 className={cls.formTitle}>Add New Question</h1>

            <div className={cls.formContainer}>
                <form action={''} className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea
                            defaultValue={'defaultV'}
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
                            defaultValue={'defaultV'}
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
                            defaultValue={'defaultV'}
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
                            defaultValue={'defaultV'}
                            name="resources"
                            id="resourcesField"
                            cols={30}
                            rows={5}
                            required={true}
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
                            defaultVault={'defaultV'}
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
                            defaultValue={'true'}
                        />
                        <span>Clear Form after submitting?</span>
                    </label>

                    <Button>Add Question</Button>
                </form>
            </div>
        </>
    );
}
