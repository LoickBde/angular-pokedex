import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  private readonly limitPokemons: number = 20;
  public pagedPokemons: PagedData<Pokemon> = {
    data: [],
    limit: -1,
    offset: -1
  };
  @Output() pokemonIdEvent = new EventEmitter<number>();
  @Input() public searchTerm?: string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons(this.limitPokemons, 0);
  }

  private getTenPokemons(): void {
      this.pokemonService.getTenPokemons().subscribe(result => this.pagedPokemons = result);
  }

  private getPokemons(limit: number, offset: number, term?: string): void {
      if(limit < 0 || offset < 0)
        return;
      this.pokemonService.getPokemons(limit, offset, term).subscribe(result => {
        if(!offset) {
          this.pagedPokemons.data = result.data;
        } else {
          this.pagedPokemons.data.push(...result.data); //Spread syntax MDN
        }
      });
  }

  public onScroll(): void {
    this.getPokemons(this.limitPokemons, this.pagedPokemons.data.length, this.searchTerm);
  }

  public onSelectedPokemon(id :number): void {
    this.pokemonIdEvent.emit(id);
  }

  public searchPokemons(term: string): void {
    this.getPokemons(this.limitPokemons, 0, term);
  }

  /** @deprecated */
  public getNextPokemons(): void {
    let offset: number;
    offset = this.pagedPokemons.offset + this.limitPokemons;
    if(offset >= this.pokemonGeneration)
      offset = this.pokemonGeneration - this.limitPokemons - 1;
    this.getPokemons(this.limitPokemons, offset);
  }

  /**@deprecated */
  public getPreviousPokemons(): void {
    let offset: number;
    offset = this.pagedPokemons.offset - this.limitPokemons;
    if(offset < 0)
      offset = 0;
    this.getPokemons(this.limitPokemons, offset);
  }
}
