import { Component, OnInit } from '@angular/core';
import { FestService } from '../fest.service';
import * as jwt_decode from "jwt-decode";

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

  bandasSeleccionadas: any[];
  constructor(private festService: FestService) {
    this.tokenInPage = localStorage.getItem('token_user');
    this.idFest = localStorage.getItem('id_fest');
    this.bandasSeleccionadas = [];

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

  }


}
