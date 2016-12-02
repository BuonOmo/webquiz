export class Question {
  _id: string;
  question: string;
  domain: string;
  answers: Array<string>;
  goodAnswer?: number;
}
export class Answer {
  isGoodAnswer: boolean;
  goodAnswerIndex: number;
}