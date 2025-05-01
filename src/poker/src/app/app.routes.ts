import { Routes } from '@angular/router';
import { PokerComponent } from './components/poker/poker.component';

export const routes: Routes = [
  { path: '', redirectTo: 'poker', pathMatch: 'full' },
  { path: 'poker', component: PokerComponent }
];
