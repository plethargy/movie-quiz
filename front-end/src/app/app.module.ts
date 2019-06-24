import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { SummaryComponent } from './summary/summary.component';
import { CategoryComponent } from './category/category.component';

//************************************************************************************
// BOOTSTRAP IMPORT
//************************************************************************************
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    SummaryComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    //NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
