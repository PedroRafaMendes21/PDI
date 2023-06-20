import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Viagem } from '../model/viagem';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {
  viagemList:Observable<any[]>;
  criarViagem: FormGroup;
  reservedViagens: Viagem[] = [];
  reservasList: Observable<any[]>;
  
  constructor(
    public data: DataService,
    public formBuilder: FormBuilder
  ) {
    this.criarViagem = this.formBuilder.group({
      id: [''],
      dataViagem: [''],
      contacto: [''],
      nomeAluno: [''],
      cidadePartida: [''],
      nomeInstituicao: [''],
    });
    this.reservasList= this.data.getReservasList();
    this.viagemList = this.data.getViagemList();
     
    
  }

  ngOnInit(): void {
   
    
  }
  
  deleteViagemAndReserva(viagemId: string, reservaId: string) {
    this.data.deleteViagem(viagemId)
      .then(() => {
        return this.data.deleteReserva(reservaId);
      })
      .then(() => {
        console.log('Viagem and Reserva deleted successfully.');
  
        // Update the table by filtering out the deleted reserva
        this.reservasList = this.reservasList.pipe(
          map((reservas: any[]) => reservas.filter(reserva => reserva.id !== reservaId))
        );
      })
      .catch(error => {
        console.error('Error deleting Viagem and Reserva:', error);
      });
  }
  
  deleteViagem(viagemId: string): void {
    this.data.deleteViagem(viagemId)
      .then(() => {
        console.log('Viagem deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting viagem:', error);
      });
  }

  
  onSubmit() {
    // Assign the user ID to the new trip
    this.criarViagem.patchValue({ userId: this.data.userId });

    this.data.creatViagem(this.criarViagem.value);
    this.criarViagem = this.formBuilder.group({
      id: [''],
      dataViagem: [''],
      contacto: [''],
      nomeAluno: [''],
      cidadePartida: [''],
      nomeInstituicao: [''],
    });
  }
}
