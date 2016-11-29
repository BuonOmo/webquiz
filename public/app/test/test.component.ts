import {Question} from "../question/question";
import {QuestionService} from "../question/question.service";

export class TestComponent{
  question: Question;
  count: number = 0;
  score: number = 0;
  
  constructor(protected questionService: QuestionService) {};
  
  nextQuestion() {
    this.count++;
    this.questionService.getQuestion().then(question => this.question = question);
  }
}
