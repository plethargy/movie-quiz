//************************************************************************************
// IMPORTS
//************************************************************************************
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

//************************************************************************************
// Models
//************************************************************************************
import { QuestionData } from "../models/questions.model";
import { QuestionService } from "../services/question.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  //************************************************************************************
  // DECLARTIONS AND VARIABLES
  //************************************************************************************
  private question = 'Apple';
  private Choice1 = "peanut"
  private Choice2 = "mongo"
  private Choice3 = "yo"
  questionSingle: QuestionData;

  constructor(public QuestionService: QuestionService) {

  }
  ngOnInit() {
    this.QuestionService.getQuestion();
  }

  ngOnDestroy() {

  }

  //************************************************************************************
  // FUNCTIONS
  //************************************************************************************
  nextQuestion() {

  }

  //************************************************************************************
  // TIMER
  //************************************************************************************
  timeLeft: number = 10;
  score: number = 200;
  totalScore: number = 0;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.score--;
      } else {
        this.totalScore = this.score;
      }
    }, 1000)
  }

}
