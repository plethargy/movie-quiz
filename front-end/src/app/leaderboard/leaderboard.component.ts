import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  users: User[] = null; 
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getLeaders().pipe().subscribe(users => {
      this.users = users.result;
      
    });
  }
  playAgain() {
    this.router.navigate(['/category'], { skipLocationChange: true });
  }
  logOut() {
    localStorage.removeItem("username");
    if (localStorage.getItem('username') == null) {
      // go back to klogin screen
      this.router.navigate(['/login'], { skipLocationChange: false });

    }
  }

}
