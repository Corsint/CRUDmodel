import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game, GameData } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly http = inject(HttpClient)
  private readonly url = "http://localhost:3000/games"

  getAll(){
    return this.http.get<Game[]>(this.url)
  }

  getById(id:string|number){
    return this.http.get<Game>(`${this.url}/${id}`)
  }

  create(game: GameData){
    return this.http.post<Game>(this.url,game)
  }

  update(id:string|number, game: GameData){
    return this.http.patch<Game>(`${this.url}/${id}`, game)
  }

  delete(id:string|number){
    return this.http.delete<Game>(`${this.url}/${id}`) 
  }
}
