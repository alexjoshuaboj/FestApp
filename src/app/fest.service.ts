import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pid } from 'process';



@Injectable({
  providedIn: 'root'
})
export class FestService {
  idFest: any;
  private registerURL: string;
  private loginURL: string;
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.registerURL = "http://localhost:3000/users/register";
    this.loginURL = "http://localhost:3000/users/login";
    this.baseURL = "http://localhost:3000/sendUser";
  }

  getUserAndTokenSpotify(): Promise<any> {
    return this.httpClient.get<any>(this.baseURL).toPromise();
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
  };

  getUserInfo(idUser) {
    return this.httpClient.get(`http://localhost:3000/users/getUser/${idUser}`).toPromise();
  };

  updateUserInfo(form, idUser) {
    console.log(form, idUser);
    return this.httpClient.post(`http://localhost:3000/users/updateUser/${idUser}`, form).toPromise();
  };

  getUserFestival(idUser) {
    console.log(idUser);
    return this.httpClient.get(`http://localhost:3000/fests/getUserFestivals/${idUser}`).toPromise();
  };

  getAllArtist() {
    return this.httpClient.get('http://localhost:3000/fests/getArtist').toPromise();
  };

  addArtist(pData) {
    return this.httpClient.post('http://localhost:3000/fests/addArtist', pData).toPromise();
  };

  addArtistFestival(pForm) {
    return this.httpClient.post('http://localhost:3000/fests/addArtistFest', pForm).toPromise();
  };

  setIdFest(pIdFest) {
    this.idFest = pIdFest;
  };

  getIdFest() {
    return this.idFest;
  }

  getHoursBands(pIdUser, pFest) {
    return this.httpClient.get(`http://localhost:3000/fests/getHours/${pIdUser}/${pFest}`).toPromise();
  }

}     
