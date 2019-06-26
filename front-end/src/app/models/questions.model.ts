export interface QuestionData {
    question: string;

    choice1: {
        question: string,
        answer: boolean
    }

    choice2: {
        question: string,
        answer: boolean
    }

    choice3: {
        question: string,
        answer: boolean
    }

    category: string;

    picture: string;

} 