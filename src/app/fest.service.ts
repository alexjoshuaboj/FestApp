import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FestService {

  private registerURL: string;
  private loginURL: string;


  constructor(private httpClient: HttpClient) {
    this.registerURL = "http://localhost:3000/users/register";
    this.loginURL = "http://localhost:3000/users/login";
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


}
