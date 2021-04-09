import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { PokemonDetail } from '../model/pokemon-detail.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'pkmn-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public pokemonDetail?: PokemonDetail;

  @Input() public pokemonId: number = 1;

  constructor(private route: ActivatedRoute, private location: Location, private pokemonService: PokemonService) { }

  ngOnChanges(changes: SimpleChange): void {
    this.pokemonDetail = undefined;
    this.getPokemon();
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon(): void {
    if(this.pokemonId === undefined || this.pokemonId <= 0)
      return;
    this.pokemonService.getPokemon(this.pokemonId).subscribe(result => this.pokemonDetail = result);
  }

  /**@deprecated utilsation du pipe */
  public formatValue(val: number): string {
    if(val >= 0 && val < 10){
      return "00" + val;
    } else if(val >= 10 && val < 100){
      return "0" + val;
    } else {
      return val.toString();
    }
  }

  /**@deprecated plus besoin */
  public goback(): void {
    this.location.back();
  }

}
