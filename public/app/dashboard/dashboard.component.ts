import {Component, OnInit, Input} from '@angular/core';
import {UserService} from "../user/user.service";
import {ResultService} from "../result/result.service";
import {Result} from "../result/result";
import {QuestionService} from "../question/question.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: '/component/dashboard'
})

export class DashboardComponent implements OnInit{
  totalRatio: number;
  hasTotalRatio: boolean;
  @Input() results: Array<Result>;
  domains: Promise<Array<string>>;
  mean: number;
  hasMean: boolean;
  modalExam: boolean = false;
  modalGrades: boolean = false;
  numberOfQuestionsInput: number;
  domainsInput: Array<string>;
  
  ngOnInit(): void {
    this.userService.getUser()
      .then(user => {
        this.totalRatio = Math.round(user.goodAnswers / user.answers * 100);
        this.hasTotalRatio = !Number.isNaN(this.totalRatio);
      });
    
    this.resultService.getResults().then(results => {
      if (results && results.length) {
        this.results = results;
        this.mean = results.reduce((prev,curr) => prev + curr.goodAnswers / (curr.totalAnswers || 1), 0);
        this.hasMean = !Number.isNaN(this.mean);
        this.mean = 20 * this.mean / results.length;
      } else {
        this.hasMean = false
      }
    });
    
    this.domains = this.questionService.getDomains();
  }
  
  /**
   * The dashboard has two modals which use an external component.
   * @param userService
   * @param resultService
   * @param questionService
   */
  constructor(private userService: UserService,
              private resultService: ResultService,
              private questionService: QuestionService,
              private router: Router) {
  };
  
  removeStatistics() {
    this.userService.removeStatistics().then(() => {
      this.hasTotalRatio = false;
      this.hasMean = false;
      this.results = null;
    })
  }
  
  startExam() {
    this.userService.createExam(this.numberOfQuestionsInput, this.domainsInput).then(() => this.router.navigate(['exam']))
  }
}
