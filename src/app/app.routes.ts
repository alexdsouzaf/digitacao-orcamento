import { PaginaImpressaoComponent } from './pagina-impressao/pagina-impressao/pagina-impressao.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal/principal.component';

export const routes: Routes = [
    { path: '', redirectTo: 'principal', pathMatch: 'full' },
    { path: 'principal', component: PrincipalComponent },
    { path: 'impressao', component: PaginaImpressaoComponent }
  ];
