import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pkmn-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  @Input() public pokemonId: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectedPokemon(id: number){
    this.pokemonId = id;
  }

}
