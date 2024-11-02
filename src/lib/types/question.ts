//Question type can be single_select or multi_select
export type QuestionType = 'single_select' | 'multi_select'


// Question interface 
export interface Question {
    id: number;
    type: QuestionType;
    question: string;
    options: string[];
    answer: string | string[];
    image?: string;
}