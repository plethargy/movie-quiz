import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { CategoryComponent } from './category/category.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { SummaryComponent } from './summary/summary.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'category', component: CategoryComponent
    ,
    canActivate: [AuthGuard]},
  {
    path: 'leaderboard', component: LeaderboardComponent,
    canActivate: [AuthGuard]},
  {
    path: 'question/:id', component: QuestionsComponent,
    canActivate: [AuthGuard]},
  {
    path: 'summary', component: SummaryComponent,
    canActivate: [AuthGuard]},
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  
  { path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
