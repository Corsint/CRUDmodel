import { Component, inject, OnInit, signal } from '@angular/core';
import { GameService } from '../../data-access/game.service';
import { Game } from '../../data-access/game.model';
import { Router } from '@angular/router';
import { GameCard } from '../../../shared/game-card/game-card';

@Component({
  selector: 'app-game-list',
  imports: [GameCard],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList implements OnInit {
  private gameService = inject(GameService)
  router= inject(Router)

  games = signal<Game[]>([])
  filteredGames = signal<Game[]>([])

  ngOnInit() {
    this.gameService.getAll().subscribe({
      next: (games) => {
        this.games.set(games)
        this.filteredGames.set(this.games())
      }
    })
  }

  filterByCategory(category: string) {
  this.filteredGames.set(
    category ? this.games().filter(g => g.category === category) : this.games()
  );
}
}

