//************************************************************************************
// IMPORTS
//************************************************************************************
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from "@angular/router";

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
  questions: number = 0;
  questionSingle: QuestionData;
  categoryID: string;

  // QUESION PLACE
  username: string = "bob"
  question: string;
  choice1: [];
  choice2: [];
  choice3: [];
  

  // TIMER
  timeSeconds: number = 10;
  timeMili: number;
  score: number = 0;
  totalScore: number = 0;
  interval;

  constructor(public route: ActivatedRoute, public QuestionService: QuestionService, private router: Router) {

  }
  ngOnInit() {
  
    this.startTimer();
    this.nextQuestion();
  }

  ngOnDestroy() {

  }

  //************************************************************************************
  // FUNCTIONS
  //************************************************************************************
  nextQuestion(): void {
    this.questions++;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.QuestionService.getQuestion("1").subscribe(questionData => {
        this.question = questionData.results[this.questions].question;
        this.choice1 = questionData.results[this.questions].choice1[0];
        this.choice2 = questionData.results[this.questions].choice2[0];
        this.choice3 = questionData.results[this.questions].choice3[0];
      });
    });
    
   
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
