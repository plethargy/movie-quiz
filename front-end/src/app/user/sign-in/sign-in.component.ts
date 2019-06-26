import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  resultTemp: any;

  model = {
    email: '',
    password: ''
  };
  serverErrorMessages: string;
  showErrorMessage: boolean;
  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');
  }

  onSubmit(form: NgForm) {
    console.log(form.value.name);
    localStorage.setItem('username', form.value.name);
    this.userService.login(form.value).subscribe(
      res => {
        this.resultTemp = res;
        this.showErrorMessage = true;
        setTimeout(() => this.showErrorMessage = false, 6000);
        this.resetForm(form);
        if (this.resultTemp.status == true)
          this.router.navigateByUrl('/category');
      },
      err => {
        this.serverErrorMessages = 'Servers are down sorry for the inconvenience';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      name: '',
      password: '',
      score: 0
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
