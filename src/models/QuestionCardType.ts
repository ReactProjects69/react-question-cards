export class QuestionCardType {
    id: string = '';
    question: string = '';
    answer: string = '';
    description: string = '';
    resources: string[] = [];
    level: number = 0;
    completed: boolean = false;
    editDate: string | undefined;
}
