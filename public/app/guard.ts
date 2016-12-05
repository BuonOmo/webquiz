import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {UserService} from "./user/user.service";

@Injectable()
export class Guard implements CanActivate {
  canActivate() {
    return this.userService.getUser().then(user => user.currentExam == null);
  }
  
  constructor(private userService: UserService) {};
}