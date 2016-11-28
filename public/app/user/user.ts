export class User {
  name: string;
  answers: number;
  goodAnswers: number;
  goodExamAnswers: number;
  results: Array<string>;
  preferences:  Preference;
  currentExam: Exam
}
class Preference {
  domains: Array<string>;
  numberOfQuestions: number;
}
class Exam {
  score: number;
  counter: number;
  questionIds: Array<string>;
  numberOfQuestions: number;
  domains: Array<string>;
}