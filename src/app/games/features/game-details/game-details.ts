import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../data-access/game.model';
import { GameService } from '../../data-access/game.service';
import { GameForm } from '../game-form/game-form';

@Component({
  selector: 'app-game-details',
  imports: [GameForm],
  templateUrl: './game-details.html',
  styleUrl: './game-details.css',
})
export class GameDetails implements OnInit {
  private aRoute = inject(ActivatedRoute)
  private gameService = inject(GameService)
  private router = inject(Router)

  private id = this.aRoute.snapshot.paramMap.get('id')!

  game = signal<Game | null>(null)
  editing = signal<boolean>(false)

  ngOnInit() {
    this.gameService.getById(this.id).subscribe({
      next: (game) => {
        this.game.set(game)
      }
    })
  }

  onEdited(game: Game) {
    this.game.set(game)
    this.editing.set(false)
  }

  deleteGame(id:string|number){
    if(!confirm('Desea eliminar este juego?'))return
    this.gameService.delete(id).subscribe({
      next:()=>{
        alert('Juego eliminado con exito')
        this.router.navigate(['/games'])
      }
    })
  }
}
