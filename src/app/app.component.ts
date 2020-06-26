import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }

  faCoffee = faCoffee;

  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
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
  }
}
