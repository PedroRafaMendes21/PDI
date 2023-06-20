import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router
  ) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Set the user ID when the user is authenticated
      } else {
        this.userId = null; // Reset the user ID when the user is logged out
      }
    });
  }

  getUserId(): string | null {
    return this.userId;
  }

  registar(email: string, password: string) {
    const alumniEmailRegex =/^[A-Za-z0-9._%+-]+@alumni\.[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    const isAlumniEmail = alumniEmailRegex.test(email);
  
    if (!isAlumniEmail) {
      alert('Please use a valid email address ending with @alumni.pt');
      return;
    }
  
    this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Profile created successfully');
        this.router.navigate(['homepage']);
      })
      .catch((error) => {
        console.error('Failed to create user:', error);
        alert('An error occurred while creating the profile');
      });
  }
  

  login(email: string, password: string) {
    this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['homepage']);
      })
      .catch((error) => {
        alert('Credenciais Erradas');
      });
  }

  logout() {
    this.fireauth
      .signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      });
  }

  getUserEmail(): Observable<string | null> {
    return this.fireauth.authState.pipe(
      map((user) => (user ? user.email : null))
    );
  }
}
