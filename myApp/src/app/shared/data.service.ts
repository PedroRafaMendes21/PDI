import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Viagem } from '../model/viagem';
import { Observable } from 'rxjs';
import { Reserva } from '../model/reserva';
import { AuthService } from './auth.service';
import { from, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public userId: string | undefined; // Variable to store the user ID

  constructor(
    private angularFirestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid; // Set the user ID when the user is authenticated
      }
    });
  }
  
  reserveViagem(viagem: Viagem) {
    if (this.userId) {
      const reserva: { viagemData: Viagem, userEmail: string | null } = {
        viagemData: viagem,
        userEmail: null
      };
  
      const userEmail$ = this.authService.getUserEmail();
      const userEmailPromise = firstValueFrom(userEmail$);
  
      return userEmailPromise.then(userEmail => {
        reserva.userEmail = userEmail;
  
        const reservaCollection = this.angularFirestore.collection(`/users/${viagem.userID}/Reservas`); // Save reservation under the creator's path
  
        return reservaCollection.add(reserva)
          .then(reservaRef => {
            const reservaId = reservaRef.id;
            return reservaRef.update({ id: reservaId }); // Update the document with the generated ID
          });
      });
    } else {
      return Promise.reject('User not authenticated');
    }
  }
  
  getUserId(): string | undefined {
    return this.userId;
  }
  
  
  
  getViagemDoc(id: string | undefined) {
    return this.angularFirestore
      .collection(`/users/${this.userId}/Viagens`) // Retrieve trips under user-specific path
      .doc(id)
      .valueChanges();
  }
  
  getAllViagemList(): Observable<any[]> {
    return this.angularFirestore.collectionGroup('Viagens').valueChanges();
  }
  getViagemList(): Observable<any[]> {
    return this.angularFirestore.collection(`/users/${this.userId}/Viagens`).valueChanges();
  }

  creatViagem(viagem: Viagem) {
    if (this.userId) {
      const viagemToAdd = { ...viagem, userID: this.userId }; // Create a copy of the viagem object and assign userID
      
      return this.angularFirestore
        .collection(`/users/${this.userId}/Viagens`)
        .add(viagemToAdd)
        .then(docRef => {
          const viagemId = docRef.id;
          return docRef.update({ id: viagemId }); // Update the document with the generated ID
        });
    } else {
      return Promise.reject('User not authenticated');
    }
  }
  
  getReservasList(): Observable<any[]> {
    return this.angularFirestore.collection(`/users/${this.userId}/Reservas`).valueChanges();
  }
  
 

  
  
  deleteViagem(viagemId: string) {
    return this.angularFirestore
      .collection(`/users/${this.userId}/Viagens`)
      .doc(viagemId)
      .delete();
  }
  
  
  deleteReserva(reservaId: string) {
    return this.angularFirestore
      .collection(`/users/${this.userId}/Reservas`)
      .doc(reservaId)
      .delete();
  }
  
}
