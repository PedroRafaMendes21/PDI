import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AddTravelComponent } from './add-travel/add-travel.component';
import { SearchTravelComponent } from './search-travel/search-travel.component';
import { MinhasviagensComponent } from './minhasviagens/minhasviagens.component';
import { ReservasComponent } from './reservas/reservas.component';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'addTravel', component: AddTravelComponent },
  { path: 'searchTravel', component: SearchTravelComponent },
  { path: 'reservas', component: MinhasviagensComponent },
  { path: 'minhasviagens', component: ReservasComponent },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
