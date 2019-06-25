import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  //user: User = {}; 
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getLeaderBoard(){
  this.userService.getLeaders();
  }

}
