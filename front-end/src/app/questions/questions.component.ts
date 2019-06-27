//************************************************************************************
// IMPORTS
//************************************************************************************
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

//************************************************************************************
// Models
//************************************************************************************
import { QuestionData } from "../models/questions.model";
import { QuestionService } from "../services/question.service";
import { TouchSequence } from 'selenium-webdriver';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  //************************************************************************************
  // DECLARTIONS AND VARIABLES
  //************************************************************************************
  questions: number = -1;
  questionSingle: QuestionData;
  categoryID: string;

  // QUESION TYPES
  username: string = "bob"
  question: string;
  choice1: [];
  choice2: [];
  choice3: [];

  answer1: boolean;
  answer2: boolean;
  answer3: boolean;
  answer: boolean;
  image: string;

  results: any = [];

  // GETTING THE ANSWERS
  public result: any;

  // TIMER
  timeSeconds: number = 10;
  timeMili: number = 10000;
  timeLeft: number;
  score: any = 0;
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
    this.timeSeconds = 10;
    this.getQuestionData();

    if (this.questions >= 6) {

      this.QuestionService.postScore(this.score);

      this.router.navigate(['/summary']);

      clearInterval(this.interval);
    }
  }

  getQuestionData() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.QuestionService.getQuestion(paramMap.get("id")).subscribe(questionData => {
        this.results = questionData["results"];
        this.question = this.results[this.questions].question;
        this.choice1 = this.results[this.questions].choice1[0];
        this.choice2 = this.results[this.questions].choice2[0];
        this.choice3 = this.results[this.questions].choice3[0];

        this.answer1 = this.results[this.questions].choice1[1];
        this.answer2 = this.results[this.questions].choice2[1];
        this.answer3 = this.results[this.questions].choice3[1];

        this.image = this.results[this.questions].image;

      });
    });
  }

  // ON FORM SUMBIT
  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.result = form.controls["selection"].value;
    this.getQuestionData();

    if (this.choice1 == this.result) {
      if (this.answer1 == true) {
        this.scoreCounter();
        console.log(this.score);
      }
      else {
        this.score += 0;
      }
    } else if (this.choice2 == this.result) {
      if (this.answer2 == true) {
        this.scoreCounter();
        console.log(this.score);
      }
      else {
        this.score += 0;
      }
    } else if (this.choice3 == this.result) {
      if (this.answer3 == true) {
        this.scoreCounter();
        console.log(this.score);
      }
      else {
        this.score += 0;
      }
    }
    form.resetForm();
  }

  //************************************************************************************
  // TIMER
  //************************************************************************************
  // 1. If the timer is 0 go to the next question
  // 2. The milliseconds needs to be converted to seconds for the timer.
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeLeft = this.timeSeconds--;
        if (this.timeSeconds == 0) {
          this.nextQuestion();
          this.score += 0;
        }
      }
    }, 1000)
  }

  scoreCounter() {

    if (this.timeLeft >= 7) {
      this.score += (this.timeLeft * 3) * 1000;
    }
    else if (this.timeLeft < 7 && this.timeLeft > 3) {
      this.score += (this.timeLeft * 2) * 1000;
    }
    else {
      this.score += (this.timeLeft) * 1000;

    }
  }
}