import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FestService } from '../fest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




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

  ngOnInit(): void {
  }

  onClick() {
    this.festService.postLogin(this.formUser.value)
      .then(res => {
        if (res) {
          let caca: Object = res;
          this.festService.setToken(caca['token']);
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

  /*   spotifyBTN() {
      this.festService.getSpotifyAuth()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    } */

}
