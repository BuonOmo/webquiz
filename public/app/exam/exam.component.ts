import {Component, OnInit, forwardRef} from '@angular/core';
import {User} from "../user/user";
import {Question, Answer} from "../question/question";
import {QuestionService} from "../question/question.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {TestComponent} from "../test/test.component";
import {StatisticsService} from "../statistics/statistics.service";
import {Result} from "../result/result";
import {ResultService} from "../result/result.service";

@Component({
  templateUrl: `/app/exam/exam.component.html`,
  providers: [{provide: TestComponent, useExisting: forwardRef(() => ExamComponent) }]
})

export class ExamComponent extends TestComponent implements OnInit{
  user: User;
  
  ngOnInit(): void {
    this.userService.getUser()
      .then(user => {
        this.user = user;
        if (!user.currentExam) this.router.navigate(['/dashboard']);
        this.count = user.currentExam.counter;
        this.goodAnswers = user.currentExam.score;
        this.getQuestion();
      });
  }
  
  
  constructor(protected questionService: QuestionService, protected statisticsService: StatisticsService,
              private userService: UserService, private resultService: ResultService,
              private router: Router) {
    super(questionService, statisticsService);
  }
  
  getQuestion(): Promise<Question> {
    if (this.count >= this.user.currentExam.numberOfQuestions) {
      const result = new Result(this.user.currentExam.domains, new Date, this.goodAnswers, this.count, false);
      this.resultService.addResult(result).then(() => {
        this.userService.finishExam();
        this.router.navigate(['result']);
      })
    } else return this.questionService.getQuestion(this.user.currentExam.questionIds[this.count])
      .then(question => this.question = question)
  }
  
  updateStatistics(answer: Answer) {
    if (this.isGoodAnswer = answer.isGoodAnswer){
      this.goodAnswers++;
      this.statisticsService.inc(['goodAnswers', 'answers', 'goodExamAnswers', 'examAnswers']);
    } else this.statisticsService.inc(['answers']);
    this.count++;
    console.log(this.goodAnswers, this.count);
    this.userService.saveExam(this.goodAnswers, this.count);
  }
  
  surrender() {
    const result = new Result(this.user.currentExam.domains, new Date, 0, this.count, true);
    this.resultService.addResult(result).then(() => {
      this.userService.finishExam();
      this.router.navigate(['result']);
    })
  }

}
