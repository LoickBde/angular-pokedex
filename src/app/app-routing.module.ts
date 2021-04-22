import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokemons',
    loadChildren: () => import('./pokemons/pokemons.module').then(m => m.PokemonsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionModule)
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
