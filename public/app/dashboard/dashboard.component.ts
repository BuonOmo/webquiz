import {Component, OnInit, ViewContainerRef, Input} from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {Overlay} from "angular2-modal";
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {DomSanitizer} from "@angular/platform-browser";
import {ResultService} from "../result/result.service";
import {Result} from "../result/result";

const EXAM_MODAL = `
<form action="post">
  <div class="form-group">
    <label for="numberOfQuestions">Nombre de questions</label>
    <input type="number" min="1" value="10" id="numberOfQuestions" name="numberOfQuestions" autofocus="autofocus"
           class="form-control"/>  
  </div>
  <div class="form-group">
    <label for="domains">Domaines concernés</label>
    <select id="domains" name="domains" multiple="multiple" class="form-control">
       <option value="foo">foo</option>
    </select> 
  </div>
</form>`;

const GRADES_MODAL = `
<table class="table table-hover"  *ngIf="results">
  <thead>
      <tr>
          <th>Domaines</th>
          <th>Date</th>
          <th>réponses juste</th>
          <th>total des réponses</th>
          <th>Note (/20)</th>
      </tr>
  </thead>
  <tbody>
      <tr *ngFor="let result of results">
          <td class="domains">{{result.domains.join(', ')}}</td>
          <td class="date">{{result.date}}</td>
          <td class="good-answers">{{result.goodAnswers}}</td>
          <td class="total-answers">{{result.totalAnswers}}</td>
          <td class="grade">{{(20 * result.goodAnswers / result.totalAnswers).toFixed(2)}}</td>
      </tr>
  </tbody>
  <div *ngIf="!results">Vous n’avez finit aucun examen</div>
</table>`;

@Component({
  templateUrl: `/app/dashboard/dashboard.component.html`
})

export class DashboardComponent implements OnInit{
  totalRatio: number;
  hasTotalRatio: boolean;
  @Input() results: Array<Result>;
  mean: number;
  hasMean: boolean;
  
  ngOnInit(): void {
    this.userService.getUser()
      .then(user => {
        this.totalRatio = Math.round(user.goodAnswers / user.answers * 100);
        this.hasTotalRatio = !Number.isNaN(this.totalRatio);
      });
    
    this.resultService.getResults().then(results => {
      if (results && results.length) {
        this.results = results;
        this.mean = results.reduce((prev,curr) => prev + curr.goodAnswers / curr.totalAnswers, 0) * 20;
        this.hasMean = !Number.isNaN(this.mean);
      } else {
        this.hasMean = false
      }
    })
  }
  
  /**
   * The dashboard has two modals which use an external component.
   * @param userService
   * @param resultService
   * @param sanitizer   DomSanitizer is used to trust content of modal, see g.co/ng/security#xss
   * @param overlay     Overlay is used for our modals
   * @param vcRef       vcRef is binded with overlay, still for modals
   * @param modal
   */
  constructor(private userService: UserService,
              private resultService: ResultService,
              private sanitizer: DomSanitizer,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  };
  
  removeStatistics() {
    this.userService.removeStatistics().then(() => {
      this.hasTotalRatio = false;
      this.hasMean = false;
      this.results = null;
    })
  }
  
  openExamModal() {
    this.modal.confirm()
      .size('lg')
      .isBlocking(false)
      .showClose(true)
      .keyboard(27)
      .title('Choix des caractéristiques de l’examen')
      .body(this.sanitizer.bypassSecurityTrustHtml(EXAM_MODAL) as string)
      .okBtn('Commencer')
      .open();
  }
  
  openGradesModal() {
    this.modal.alert()
      .size('lg')
      .isBlocking(true)
      .showClose(false)
      .keyboard(27)
      .title('Détails des notes')
      .body(this.sanitizer.bypassSecurityTrustHtml(GRADES_MODAL) as string)
      .open();
  }
}
