import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  showSucessMessage: boolean;
  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 6000);
        this.resetForm(form);
        this.router.navigateByUrl('/category');
      },
      err => {
        this.serverErrorMessages = 'Servers are down sorry for the inconvenience';
      }
    );
  }


  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
