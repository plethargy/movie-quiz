import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  username: string;


  ngOnInit() {
    this.username = localStorage.getItem('username');
    localStorage.setItem('username', this.username);
  }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  onClickLogout() {
    localStorage.removeItem("username");
    if (localStorage.getItem('username') == null) {
      this.router.navigate(['/login']);

    }
  }

  onClickCategory() {
    this.router.navigate(['/category']);
  }

}
