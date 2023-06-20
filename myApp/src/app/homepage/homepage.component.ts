import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private auth: AuthService,private router: Router) {
    this.userName = this.auth.getUserEmail();
  }
  items: MenuItem[] = [];
  userName:  Observable<string|null>;
  
ngOnInit(){
  this.userName = this.auth.getUserEmail();
  this.userName.subscribe(email => {  });
 

}
logout() {
  
  this.router.navigate(['/login']);
}
onClickADD(){

  this.router.navigate(['/addTravel'])
}
onClicksearchTravel(){

  this.router.navigate(['/searchTravel'])
}
onClickMinhas(){

  this.router.navigate(['/reservas'])
}
onClickReser(){

  this.router.navigate(['/minhasviagens'])
}
}


