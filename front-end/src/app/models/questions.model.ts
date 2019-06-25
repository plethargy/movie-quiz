export interface QuestionData {
    quesiton: string;

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

    score: number;

} 