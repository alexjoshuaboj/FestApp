import { Component, OnInit } from '@angular/core';
import { FestService } from '../fest.service';
import * as jwt_decode from "jwt-decode";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-choose-artist',
  templateUrl: './choose-artist.component.html',
  styleUrls: ['./choose-artist.component.css']
})
export class ChooseArtistComponent implements OnInit {
  bandas: any;
  tokenInPage: any;
  tokenUser: any;
  result: any;
  idFest: any;
  done = [];

  bandasSeleccionadas: any[];
  constructor(private festService: FestService, private router: Router) {
    this.tokenInPage = localStorage.getItem('token_user');
    this.idFest = localStorage.getItem('id_fest');
    this.bandasSeleccionadas = [];
    this.done = [];
  }

  async ngOnInit() {
    this.bandas = await this.festService.getBands(this.idFest);
    this.tokenUser = this.getDecodedAccessToken(this.tokenInPage).userID;
    console.log(this.tokenUser);
    console.log(this.bandas);

  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  };

  selectBand(idBanda) {
    const bandSelected = {
      userFest: localStorage.getItem('id_fest_user'),
      bandFest: idBanda
    };
    this.bandasSeleccionadas.push(bandSelected);
    console.log(bandSelected);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
  }

  async sendBands() {
    for (let band of this.done) {
      let result = await this.festService.selectBands(band.idfestivales_bandas);
      console.log(result)
    };
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
      title: 'Bands added'
    });
    this.router.navigate(['/home']);
  }
}
