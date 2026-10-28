import { Component, inject, input, OnInit, output } from '@angular/core';
import { GameService } from '../../data-access/game.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from '../../data-access/game.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css',
})
export class GameForm implements OnInit{
  private gameService  = inject(GameService)
  private fb = inject(FormBuilder)
  private router=inject(Router)

  gameToEdit = input<Game>()
  gameEdited = output<Game>()
  cancel=output<void>()

  gameForm = this.fb.nonNullable.group({
    name:['',[Validators.required]],
    category:['',[Validators.required]],
    description:['',[Validators.required]],
    price: [0,[Validators.required]],
    onSale: [false],
  })

  ngOnInit(){
    const gameToEdit = this.gameToEdit()
    if(gameToEdit){
      this.gameForm.patchValue(gameToEdit)
    }
  }

  submitGame(){

    if(this.gameForm.invalid){
      this.gameForm.markAllAsTouched()
      return
    }

    const gameToEdit = this.gameToEdit()
    const newGame =  this.gameForm.getRawValue()

    if(gameToEdit){
      this.gameService.update(gameToEdit.id, newGame).subscribe({
        next:(game)=>{
          alert('Juego editado correctamente')
          this.gameEdited.emit(game)
        }
      })
    }else{
      this.gameService.create(newGame).subscribe({
        next:()=>{
          alert('Juego creado correctamente')
          this.gameForm.reset
          this.router.navigate(['/games'])
        }
      })
    }
  }



}
