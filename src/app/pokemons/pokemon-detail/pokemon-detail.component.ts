import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokemonDetail } from '../model/pokemon-detail.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'pkmn-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public pokemonDetail: PokemonDetail = {
    id: -1,
    name: "",
    description: "",
    height: -1,
    weight: -1,
    types: []
  }

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemon(id).subscribe(result => this.pokemonDetail = result);
  }

  public formatValue(val: number): string {
    if(val >= 0 && val < 10){
      return "00" + val;
    } else if(val >= 10 && val < 100){
      return "0" + val;
    } else {
      return val.toString();
    }
  }

}
