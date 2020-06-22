import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from '../firebase-storage.service';
import * as jwt_decode from "jwt-decode";
import { FestService } from '../fest.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  festivales: any;
  tokenInPage: any;
  tokenUser: any;
  userInfo: any;
  newDatas: FormGroup;
  constructor(
    private firebaseStorage: FirebaseStorageService,
    private festService: FestService
  ) {
    this.tokenInPage = localStorage.getItem('token_user');

  }


  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  async ngOnInit() {
    this.tokenUser = this.getDecodedAccessToken(this.tokenInPage).userID;
    console.log(this.tokenUser);
    this.userInfo = await this.festService.getUserInfo(this.tokenUser);
    console.log(this.userInfo);
    this.newDatas = new FormGroup({
      name: new FormControl(this.userInfo.name, [
        Validators.required
      ]),
      surname: new FormControl(this.userInfo.surname, [
        Validators.required
      ]),
      phone_number: new FormControl(this.userInfo.phone_number, [
        Validators.required
      ]),
      email: new FormControl(this.userInfo.email, [
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
        Validators.required
      ]),
      username: new FormControl(this.userInfo.username, [
        Validators.required
      ])
    })
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  };
  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
      this.festService.updatePhoto(this.tokenUser, this.URLPublica)
        .then(res => {
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
            title: 'Photo added'
          })
        })
        .catch(err => {
          console.log(err);
        })
    });
  };

  updateUser() {
    console.log(this.newDatas.value)
    this.festService.updateUserInfo(this.newDatas.value, this.tokenUser)
      .then(res => {
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
          title: 'Profile updated'
        })
      })

  }
}
