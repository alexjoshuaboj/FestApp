import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    private authService: SocialAuthService
  ) {

  };

  ngOnInit() {
  }

  logout() {
    this.route.navigate(['/login']);
    localStorage.removeItem('token_user');
    localStorage.removeItem('id_fest');
    localStorage.removeItem('id_fest_user');

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
      title: 'Logout done!'
    })

    this.authService.signOut();


  }




}
