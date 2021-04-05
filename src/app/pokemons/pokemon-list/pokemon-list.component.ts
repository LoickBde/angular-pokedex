import { Component, OnInit } from '@angular/core';
import { PagedData } from '../model/paged-data.model';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'pkmn-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  public readonly pokemonGeneration: number = 151;
  private readonly displayedPokemons: number = 12;

  public pagedPokemons: PagedData<Pokemon> = {
    data: [],
    limit: -1,
    offset: -1
  };

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons(this.displayedPokemons, 0);
  }

  private getTenPokemons(): void {
      this.pokemonService.getTenPokemons().subscribe(result => this.pagedPokemons = result);
  }

  private getPokemons(limit: number, offset: number): void {
      if(limit < 0 || offset < 0)
        return;
      this.pokemonService.getPokemons(limit, offset).subscribe(result => this.pagedPokemons = result);
  }

  public getNextPokemons(): void {
    let offset: number;

    offset = this.pagedPokemons.offset + this.displayedPokemons;

    if(offset >= this.pokemonGeneration)
      offset = this.pokemonGeneration - this.displayedPokemons - 1;

    this.getPokemons(this.displayedPokemons, offset);
  }

  public getPreviousPokemons(): void {
    let offset: number;

    offset = this.pagedPokemons.offset - this.displayedPokemons;

    if(offset < 0)
      offset = 0;

    this.getPokemons(this.displayedPokemons, offset);
  }

}
