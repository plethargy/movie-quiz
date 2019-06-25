import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: 'category', component: CategoryComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'question/:id', component: QuestionsComponent },
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }