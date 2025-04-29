import { QuestionCardType } from './QuestionCardType.ts';

export class PaginationResult {
    data?: QuestionCardType[] = [];
    first: number = 0;
    items: number = 0;
    last: number = 0;
    next: number = 0;
    pages: number = 0;
    prev?: number;
}
