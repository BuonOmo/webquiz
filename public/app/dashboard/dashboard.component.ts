import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {Overlay} from "angular2-modal";
import {Modal} from 'angular2-modal/plugins/bootstrap';

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
  
  constructor(private userService: UserService,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              public modal: Modal) {
    //*
    overlay.defaultViewContainer = vcRef;
    /*/
    modal.defaultViewContainer = vcRef;
    //*/
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
  
  openModalExam() {
    this.modal.alert()
      .size('lg')
      .isBlocking(false)
      .showClose(true)
      .keyboard(27)
      .title('Choix des caractéristiques de l’examen :')
      .body('lol')
      .okBtn('Commencer')
      .open();
  }
}
// `<label for="numberOfQuestions">Nombre de questions :</label>
//              <input id="numberOfQuestions" type="number" min="1" value="10" name="numberOfQuestions" autofocus="autofocus"/>
//              <label for="domains">Domaines concernés :</label>
//              <select id="domains" name="domains" multiple="multiple">
//                  <option value="foo">foo</option>
//              </select>`