import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FestService {

  private registerURL: string;
  private loginURL: string;
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.registerURL = "http://localhost:3000/users/register";
    this.loginURL = "http://localhost:3000/users/login";
    this.baseURL = "http://localhost:3000/";
  }

  postRegister(body): Promise<any> {
    return this.httpClient.post<any>(this.registerURL, body).toPromise();
  }

  postLogin(body) {
    /* const headers = new HttpHeaders({
      'token': 'TOKEN'
    }) */
    return this.httpClient.post(this.loginURL, body).toPromise();
  }

  setToken(token) {
    localStorage.setItem('token_user', token);
  }

  getToken() {
    localStorage.getItem('token_user');
  };

  getValidatorToken(token): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        user_token: token
      })
    };
    console.log(token)
    return this.httpClient.get(`http://localhost:3000/checkToken/${token}`, httpOptions).toPromise();
  }


  getFest() {

    return this.httpClient.get("http://localhost:3000/fests").toPromise();
  };

  selectFest(pFestId, pIdUser) {

    return this.httpClient.post('http://localhost:3000/fests/newfest', {
      "idUser": pIdUser,
      "idFestivales": pFestId
    }).toPromise();
  }

  getBands(idFest) {
    return this.httpClient.get(`http://localhost:3000/fests/${idFest}/bands`).toPromise();
  };

  updatePhoto(idUser, urlPhoto) {
    return this.httpClient.post('http://localhost:3000/users/updatePhoto', {
      id: idUser,
      url: urlPhoto
    }).toPromise();
  }

  selectBands(idBand) {
    return this.httpClient.post('http://localhost:3000/fests/newBands', {
      userFest: parseInt(localStorage.getItem('id_fest_user')),
      bandFest: idBand
    }).toPromise();
  }
  /* 
    redirectOauthSpotify(): Promise<any> {
      return this.httpClient.get(this.baseURL + `auth/spotify`).toPromise();
    } */

}
