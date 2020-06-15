import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FestService } from '../fest.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser: FormGroup;
  formRegister: FormGroup;


  constructor(
    private festService: FestService,
    private router: Router) {
    //User Login
    this.formUser = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
    //User Register
    this.formRegister = new FormGroup({
      username: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      pass: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      repeat_password: new FormControl(''),
      phone_number: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onClick() {
    this.festService.postLogin(this.formUser.value)
      .then(res => {
        if (res) {
          this.router.navigate(['/choose-fest']);
        }
      })
      .catch(err => console.log(err));
    console.log(this.formUser.value);

  }

  register() {
    this.festService.postRegister(this.formRegister.value)
      .then((res) => {
        if (res.success) {
          this.router.navigate(['/choose-fest']);
          swal("Welcome FestApp!", "Register done!", "success");
        }
      })
      .catch(err => console.log(err));
    console.log(this.formRegister.value);
  }
}
