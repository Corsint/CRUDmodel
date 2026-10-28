import { Component, inject, input } from '@angular/core';
import { Game } from '../../games/data-access/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  router=inject(Router)

  game=input<Game>()

   goToDetails(id:string|number){
    this.router.navigate(['/gameDetails/',id])
  }
}
