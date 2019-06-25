//************************************************************************************
// IMPORTS
//************************************************************************************
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

//************************************************************************************
// Models
//************************************************************************************
import { QuestionData } from "../models/questions.model";
import { QuestionService } from "../services/question.service";
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  //************************************************************************************
  // DECLARTIONS AND VARIABLES
  //************************************************************************************
  questions: number = 1;
  private question = 'Apple';
  private Choice1 = "peanut"
  private Choice2 = "mongo"
  private Choice3 = "yo"
  questionSingle: QuestionData;

  constructor(public QuestionService: QuestionService, private router: Router) {

  }
  ngOnInit() {
    this.QuestionService.getQuestion();
  }

  ngOnDestroy() {

  }

  //************************************************************************************
  // FUNCTIONS
  //************************************************************************************
  nextQuestion(): void {
    this.questions++;
    if (this.questions >= 7) {
      this.router.navigate(['/summary']);
    }
  }

  //************************************************************************************
  // TIMER
  //************************************************************************************
  timeSeconds: number = 10;
  timeMili: number = 10000;
  score: number = 200;
  totalScore: number = 0;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeSeconds--;

      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timeSeconds = this.timeMili * 1000;


    if (this.timeSeconds > 7) {

    }
    else if (this.timeSeconds < 7 && this.timeSeconds > 3) {

    }
    else {

    }
  }
}
