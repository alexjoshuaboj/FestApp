import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FestService } from '../fest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as jwt_decode from "jwt-decode";

//login with facebook
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser: FormGroup;
  formRegister: FormGroup;
  role: any;
  idUser: any;

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private festService: FestService,
    private router: Router,
    private authService: SocialAuthService
  ) {
    //User Login
    this.formUser = new FormGroup({
      email: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
    //User Register
    this.formRegister = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      pass: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      surname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      repeat_password: new FormControl(''),
      phone_number: new FormControl(''),
    });


  }

  async ngOnInit() {
    await this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  onClick() {
    this.festService.postLogin(this.formUser.value)
      .then(res => {
        if (res) {
          let caca: Object = res;
          this.festService.setToken(caca['token']);
          this.role = this.getDecodedAccessToken(caca['token']).role;
          this.idUser = this.getDecodedAccessToken(caca['token']).userID;
          console.log('Role', this.role);
          if (this.role === null) {
            this.router.navigate(['/choose-fest']);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Loggin successfully'
            })
          } else if (this.role === 'ADMIN') {
            localStorage.setItem('id_user', this.idUser);
            this.router.navigate(['/festivalsettings']);
          }

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
        }
      })
      .catch(err => console.log(err));
    console.log(this.formRegister.value);
  };
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  };

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(res => { console.log(res); })
      .catch(err => {
        console.log(err);
      })
  }

}
