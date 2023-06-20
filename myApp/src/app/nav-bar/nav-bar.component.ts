import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];
  userEmail: Observable<string | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.userEmail = this.auth.getUserEmail();
  }
  

  ngOnInit() {
    this.userEmail = this.auth.getUserEmail();

    this.userEmail.subscribe(email => {
      this.items = [
        {
          
          icon: 'fa-solid fa-house',
          command: () => this.home(),
        },
        {
          label: email ? email : 'User Email', // Use a default value if email is null
          icon: 'pi pi-fw pi-user',
          styleClass: 'user-email',
          disabled: true
        }
      ,
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => this.logout(),
        },

      ];
    });
  }

  logout() {
    this.auth.logout();
    alert('Sessão terminada com sucesso');
  }

  home() {
    this.router.navigate(['/homepage']);
  }
 
}
