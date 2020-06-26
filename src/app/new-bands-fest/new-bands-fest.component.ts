import { Component, OnInit, Input } from '@angular/core';
import { FestService } from '../fest.service';

import { FirebaseStorageService } from '../firebase-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-bands-fest',
  templateUrl: './new-bands-fest.component.html',
  styleUrls: ['./new-bands-fest.component.css']
})
export class NewBandsFestComponent implements OnInit {
  idFest: any;
  allArtist: any;
  artistSearched: any;
  formArtist: FormGroup;
  formArtistFestival: FormGroup;
  constructor(private festService: FestService, private firebaseStorage: FirebaseStorageService) {
    this.idFest = this.festService.getIdFest();
    this.formArtist = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      spotify_id: new FormControl('', [
        Validators.required
      ])
    });
    this.formArtistFestival = new FormGroup({

      inicio: new FormControl('', [
        Validators.required
      ]),
      fin: new FormControl('', [
        Validators.required
      ])
    })
  }
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  async ngOnInit() {
    this.allArtist = await this.festService.getAllArtist();

  }
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
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
    }
    );

  };
  async addArtist() {
    this.formArtist.value.img = this.URLPublica;
    console.log(this.formArtist.value);
    const result = await this.festService.addArtist(this.formArtist.value);
    console.log(result);
  };

  async addArtistFestival() {
    this.formArtistFestival.value.idFest = this.idFest;
    this.formArtistFestival.value.idArtist = this.artistSearched;
    const result = await this.festService.addArtistFestival(this.formArtistFestival.value);
    console.log(this.formArtistFestival.value);
    if (result['affectedRows'] === 1) {
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
        title: 'Done'
      })
    }
  }
}
