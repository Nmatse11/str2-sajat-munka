import { ToplistComponent } from './page/toplist/toplist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './page/game/game.component';
import { HomeComponent } from './page/home/home.component';
import { QuizboardComponent } from './page/quizboard/quizboard.component';
import { AdminComponent } from './page/admin/admin.component';
import { GamerulesComponent } from './page/gamerules/gamerules.component';
import { EditComponent } from './page/edit/edit.component';
import { GamestartComponent } from './page/gamestart/gamestart.component';
import { GameendComponent } from './page/gameend/gameend.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'gameboard',
    component: GameComponent,
  },
  {
    path: 'gamestart',
    component: GamestartComponent,
  },
  {
    path: 'gameend',
    component: GameendComponent,
  },
  {
    path: 'gamerules',
    component: GamerulesComponent,
  },
  {
    path: 'toplist',
    component: ToplistComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: '**',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
