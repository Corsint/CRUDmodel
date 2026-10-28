import { Routes } from '@angular/router';
import { GameList } from './games/features/game-list/game-list';
import { GameForm } from './games/features/game-form/game-form';
import { GameDetails } from './games/features/game-details/game-details';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/games',
        pathMatch:'full'
    },
    {
        path:'games',
        component:GameList
    },
    {
        path:'addGame',
        component:GameForm
    },
    {
        path:'gameDetails/:id',
        component:GameDetails
    },
    {
        path:'**',
        redirectTo:'games'
    }

];
