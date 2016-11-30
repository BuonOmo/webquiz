import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {Overlay} from "angular2-modal";
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {DomSanitizer} from "@angular/platform-browser";

const EXAM_MODAL = `
<form action="post">
  <div class="form-group">
    <label for="numberOfQuestions">Nombre de questions</label>
    <input type="number" min="1" value="10" id="numberOfQuestions" name="numberOfQuestions" autofocus="autofocus"
           class="form-control"/>  
  </div>
  <div class="form-group" *ngfor="">
    <label for="domains">Domaines concernés</label>
    <select id="domains" name="domains" multiple="multiple" class="form-control">
       <option value="foo">foo</option>
    </select> 
  </div>
</form>`
;
const GRADES_MODAL = `
<table class="table table-hover">
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
      <tr *ngFor="row of null">
          <td class="domains"></td>
          <td class="date"></td>
          <td class="good-answers"></td>
          <td class="total-answers"></td>
          <td class="grade"></td>
      </tr>
  </tbody>
</table>`;

@Component({
  templateUrl: `/app/dashboard/dashboard.component.html`
})

export class DashboardComponent implements OnInit{
  totalRatio: number;
  hasTotalRatio: boolean;
  
  ngOnInit(): void {
    this.userService.getUser()
      .then(user => this.calculateStatistics(user));
  }
  
  /**
   *
   * @param userService
   * @param sanitizer   DomSanitizer is used to trust content of modal, see g.co/ng/security#xss
   * @param overlay     Overlay is used for our modals
   * @param vcRef       vcRef is binded with overlay, still for modals
   * @param modal
   */
  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  };
    
  calculateStatistics(user: User) {
    this.totalRatio = Math.round(user.goodAnswers / user.answers * 100);
    this.hasTotalRatio = !Number.isNaN(this.totalRatio);
  }
  
  removeStatistics() {
    this.userService.removeStatistics().then(() => {
      this.hasTotalRatio = false;
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
