import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: 'login', component: LoginComponent }, // Login sin sidenav,
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'login' }
];
