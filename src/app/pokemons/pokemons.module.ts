import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component'


@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule
  ],
  exports : []
})
export class PokemonsModule { }
