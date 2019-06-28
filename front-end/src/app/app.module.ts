import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { QuestionsComponent } from './questions/questions.component';
import { SummaryComponent } from './summary/summary.component';
import { CategoryComponent } from './category/category.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {UserService} from './services/user.service';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    QuestionsComponent,
    SummaryComponent,
    CategoryComponent,
    LeaderboardComponent,
    NavBarComponent,
    HomeComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
