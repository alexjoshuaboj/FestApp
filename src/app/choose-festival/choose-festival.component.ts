import { Component, OnInit } from '@angular/core';
import { FestService } from '../fest.service';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-festival',
  templateUrl: './choose-festival.component.html',
  styleUrls: ['./choose-festival.component.css']
})
export class ChooseFestivalComponent implements OnInit {

  festivales: any;
  tokenInPage: any;
  tokenUser: any;
  result: any;



  constructor(private festService: FestService, private router: Router) {
    this.tokenInPage = localStorage.getItem('token_user');
  }

  async ngOnInit() {

    this.festivales = await this.festService.getFest();
    console.log(this.festivales);
    this.tokenUser = this.getDecodedAccessToken(this.tokenInPage).userID;
    console.log(this.tokenUser);

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
  async selectFest(idFest, idUser) {
    localStorage.setItem('id_fest', idFest);
    this.result = await this.festService.selectFest(idFest, idUser);
    localStorage.setItem('id_fest_user', this.result.insertId);
    this.router.navigate(['/choose-artist']);
  }

}
