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
    this.getQuestionData();

    if (this.questions >= 7) {
      this.router.navigate(['/summary']);
    }
  }

  getQuestionData() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.QuestionService.getQuestion("1").subscribe(questionData => {
        this.results = questionData["results"];
        this.question = this.results[this.questions].question;
        this.choice1 = this.results[this.questions].choice1[0];
        this.choice2 = this.results[this.questions].choice2[0];
        this.choice3 = this.results[this.questions].choice3[0];

        this.answer1 = this.results[this.questions].choice1[1];
        this.answer2 = this.results[this.questions].choice2[1];
        this.answer3 = this.results[this.questions].choice3[1];

        this.image = this.results[this.questions].image;

        console.log(this.image);

      });
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.result = form.controls["selection"].value;
    this.getQuestionData(); 

    if (this.choice1 == this.result) {
      if (this.answer1 == true) {
        this.scoreCounter();
        this.scoreCounter();
        console.log("right")
      }
      else {
        this.scoreCounter();
        console.log("wrong")
      }
    } else if (this.choice2 == this.result) {
      if (this.answer2 == true) {
        this.scoreCounter();
        console.log("right")
      }
      else {
        this.scoreCounter();
        console.log("wrong")
      }
    } else if (this.choice3 == this.result) {
      if (this.answer3 == true) {
        this.scoreCounter();
        console.log("right")
      }
      else {
        this.scoreCounter();
        console.log("wrong")
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
        this.timeSeconds--;
        if (this.timeSeconds == 0) {
        }
      }
    }, 1000)
  }

  scoreCounter() {
    clearInterval(this.interval);
    this.timeMili = (this.timeSeconds % 1) * 1000;

    if (this.timeSeconds > 7) {
      this.score = (this.timeMili * 1000) * 3;
    }
    else if (this.timeSeconds < 7 && this.timeSeconds > 3) {
      this.score = (this.timeMili * 1000) * 2;
    }
    else {
      this.score = (this.timeMili * 1000);
    }
    return this.score;
  }
}
