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
  question: string;
  Choice1: string;
  Choice2: string;
  Choice3: string;
  questionSingle: QuestionData;
  private postId: string;

  // TIMER
  timeSeconds: number = 10;
  timeMili: number;
  score: number = 0;
  totalScore: number = 0;
  interval;

  constructor(public QuestionService: QuestionService, private router: Router) {

  }
  ngOnInit() {
    this.QuestionService.getQuestion(this.postId);
    this.startTimer();
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
  // 1. If the timer is 0 go to the next question
  // 2. The milliseconds needs to be converted to seconds for the timer.
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeSeconds--;
        if (this.timeSeconds == 0) {
        }
      }
    }, 1000)
  }

  scoreCounter() {
    clearInterval(this.interval);
    this.timeMili = (this.timeSeconds % 1) * 1000;
    console.log(this.timeMili);

    if (this.timeSeconds > 7) {
      this.score = (this.timeMili * 1000) * 3;
    }
    else if (this.timeSeconds < 7 && this.timeSeconds > 3) {
      this.score = (this.timeMili * 1000) * 2;
    }
    else {
      this.score = (this.timeMili * 1000);
    }
  }
}
