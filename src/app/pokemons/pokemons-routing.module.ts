import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamGuard } from '../guard/team.guard';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: 'list',
    component: PokemonListComponent
  },
  {
    path: 'detail/:id',
    component: PokemonDetailComponent
  },
  {
    path: 'team',
    component: TeamComponent,
    canActivate: [TeamGuard]
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
