import { Component, OnInit, Input } from '@angular/core';
import { FestService } from '../fest.service';

import { FirebaseStorageService } from '../firebase-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-bands-fest',
  templateUrl: './new-bands-fest.component.html',
  styleUrls: ['./new-bands-fest.component.css']
})
export class NewBandsFestComponent implements OnInit {
  @Input() idFest: any;
  allArtist: any;
  artistSearched: any;
  formArtist: FormGroup;
  formArtistFestival: FormGroup;
  constructor(private festService: FestService, private firebaseStorage: FirebaseStorageService) {
    this.formArtist = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      spotify_id: new FormControl('', [
        Validators.required
      ])
    });
    this.formArtistFestival = new FormGroup({
      idFest: new FormControl(this.idFest),
      idArtist: new FormControl(this.artistSearched),
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
    const result = await this.festService.addArtistFestival(this.formArtistFestival.value);
  }
}
