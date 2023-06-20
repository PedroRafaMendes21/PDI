import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Viagem } from '../model/viagem';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-travel',
  templateUrl: './search-travel.component.html',
  styleUrls: ['./search-travel.component.css']
})
export class SearchTravelComponent implements OnInit {
  viagemList: any[] = [];
  instituicoes: string[] = [];
  selectedInstituicao: string = 'Escola Predefinida';
  filteredViagemList: any[] = [];
  @ViewChild('table') table: ElementRef | undefined;

  constructor(public data: DataService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.data.getAllViagemList().subscribe((res: any[]) => {
      this.viagemList = res;
      console.log(this.viagemList);
      this.instituicoes = this.getUniqueInstituicoes();
      this.filterViagens(); // Initial filtering based on selected instituicao
    });
  }

  getUniqueInstituicoes(): string[] {
    const uniqueInstituicoes = [];
    for (const viagem of this.viagemList) {
      if (uniqueInstituicoes.indexOf(viagem.nomeInstituicao) === -1) {
        uniqueInstituicoes.push(viagem.nomeInstituicao);
      }
    }
    return uniqueInstituicoes;
  }

  onInstituicaoChange(): void {
    this.filterViagens(); // Update filtered viagens based on selected instituicao
  }

  reserveViagem(viagem: Viagem) {
    this.data.reserveViagem(viagem)
      .then(() => {
        console.log('Reservation created successfully.');
        // Perform any additional actions after successful reservation
      })
      .catch(error => {
        console.error('Failed to create reservation:', error);
        // Handle error scenario
      });
  }

  filterViagens(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.filteredViagemList = this.viagemList.filter(
        (viagem: any) => viagem.userID !== userId && viagem.nomeInstituicao === this.selectedInstituicao
      );
    } else {
      this.filteredViagemList = this.viagemList.filter(
        (viagem: any) => viagem.nomeInstituicao === this.selectedInstituicao
      );
    }
  }
}
