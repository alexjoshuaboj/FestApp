import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FestService } from '../fest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';


//login with facebook
/* import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
 */




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faCoffee = faCoffee;

  formUser: FormGroup;
  formRegister: FormGroup;
  /*   user: SocialUser;
    loggedIn: boolean; */

  constructor(
    private festService: FestService,
    private router: Router,
    private httpclient: HttpClient
    /* private authService: SocialAuthService */
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
  }

  onClick() {
    this.festService.postLogin(this.formUser.value)
      .then(res => {
        if (res) {
          let caca: Object = res;
          this.festService.setToken(caca['token']);
          if (caca['token']) {
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
  }

  async getSpotifyData() {
    const result = await this.festService.getUserAndTokenSpotify();
    localStorage.setItem('token_user', result);
  }

}
