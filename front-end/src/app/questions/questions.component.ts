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
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';

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
  username: string;
  question: string;
  choice1: [];
  choice2: [];
  choice3: [];

  answer1: boolean;
  answer2: boolean;
  answer3: boolean;
  answer: boolean;
  image: string = "../assets/img/images/";
  qnumber: string = " ";

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

  // ERRORS
  showSucessMessage: boolean;
  serverErrorMessages: string;

  // CREATING AN OBJECT OF UPDATED USER
  updateUser: QuestionData = {
    name: '',
    score: 0
  };

  constructor(public route: ActivatedRoute, public QuestionService: QuestionService, private router: Router, private http: HttpClient) {

  }
  ngOnInit() {
    this.username = localStorage.getItem('username');
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

    if (this.questions >= 7) {

      // PASSING THE JSON TO THE SERVER
      this.QuestionService.postScore(this.updateUser);
      this.http.post("http://localhost:5000/user/update", {
        "name": this.username,
        "score": this.score
      })
        .subscribe(
          data => {
            console.log("POST Request is successful ", data);
          },
          error => {

            console.log("Error", error);

          });

      this.router.navigate(['/summary'], { skipLocationChange: false });
      localStorage.setItem('score', this.score);

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
        this.image = "../assets/img/images/" + this.results[this.questions].image;
        this.qnumber = (this.questions + 1) + "/7"
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
      }
      else {
        this.score += 0;
      }
    } else if (this.choice2 == this.result) {
      if (this.answer2 == true) {
        this.scoreCounter();
      }
      else {
        this.score += 0;
      }
    } else if (this.choice3 == this.result) {
      if (this.answer3 == true) {
        this.scoreCounter();
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
