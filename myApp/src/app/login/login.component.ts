import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email: string ='';
password: string =''; 

constructor(private auth:AuthService){}

ngOnInit(): void {
   
}
login(){
      if(this.email == ''){
      alert('Por favor introduz um email válido');
      return;
    }
    if(this.password == ''){
      alert('Por favor introduz a password correta');
      return;
    }

    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';
    }

    registar(){
      if(this.email == ''){
      alert('Por favor introduz um email válido');
      return;
    }
    if(this.password == ''){
      alert('Por favor introduz a password correta');
      return;
    }

    this.auth.registar(this.email,this.password);
    this.email='';
    this.password='';
    }



}

