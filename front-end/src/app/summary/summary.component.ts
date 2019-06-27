import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  name: string;
  score: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.name = localStorage.getItem('username');
    this.score = localStorage.getItem('score');
  }
  onClickLeaderBoard() {
    this.router.navigate(['/leaderboard'], { skipLocationChange: false });
  }

  onClickTryAgain(){
    this.router.navigate(['/category'], { skipLocationChange: false });
  }

}
