import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser: FormGroup;
  formRegister: FormGroup;
  constructor() {
    this.formUser = new FormGroup({
      username: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      pass: new FormControl('', [
        Validators.required
      ])
    });
    this.formRegister = new FormGroup({
      username: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      pass: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
  }

  onClick() {
    console.log(this.formUser.value);
  }

  register() {
    console.log(this.formRegister.value)
  }

}
