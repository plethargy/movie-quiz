import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { QuestionData } from '../models/questions.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {

    //************************************************************************************
    // DECLARTIONS AND VARIABLES
    //************************************************************************************
    private questions: QuestionData[] = [];

    constructor(private http: HttpClient) { }

    //************************************************************************************
    // FUNCTIONS
    //************************************************************************************
    getQuestion(id: string) {
        return this.http.get<{}>("http://localhost:5000/questions/" + id);
    }

    getScore() { }
}