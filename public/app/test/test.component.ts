import {Question} from "../question/question";
import {QuestionService} from "../question/question.service";
import {StatisticsService} from "../statistics/statistics.service";

export class TestComponent{

  question: Question;
  count: number = 0;
  score: number = 0;
  dropped: boolean = false;
  droppedAnswer: string;
  isGoodAnswer: boolean;
  goodAnswerIndex: number;
  draggedAnswer: string;
  draggedAnswerIndex: number;
  
  constructor(protected questionService: QuestionService,
              protected statisticsService: StatisticsService) {
  };
  
  nextQuestion() {
    if (!this.dropped) {
      this.statisticsService.inc(['answers']);
      this.count++;
    }
    this.dropped = false;
    this.question = this.isGoodAnswer = this.goodAnswerIndex = this.draggedAnswer = this.draggedAnswerIndex = null;
    this.questionService.getQuestion().then(question => this.question = question);
  }
  
  checkAnswer() {
    this.droppedAnswer = this.draggedAnswer;
    this.dropped = true;
    this.question.answers.splice(this.draggedAnswerIndex,1);
    this.questionService.getAnswer(this.question._id, this.draggedAnswerIndex)
      .then(answer => {
        if (this.draggedAnswerIndex < answer.goodAnswerIndex)
          this.goodAnswerIndex = answer.goodAnswerIndex - 1;
        else if (this.draggedAnswerIndex > answer.goodAnswerIndex)
          this.goodAnswerIndex = answer.goodAnswerIndex;
        if (this.isGoodAnswer = answer.isGoodAnswer){
          this.score++;
          this.statisticsService.inc(['goodAnswers', 'answers']);
        } else this.statisticsService.inc(['answers']);
        this.count++;
      });
  }
  
  prevent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  
}
