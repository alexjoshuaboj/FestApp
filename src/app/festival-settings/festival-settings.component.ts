import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FestService } from '../fest.service';

@Component({
  selector: 'app-festival-settings',
  templateUrl: './festival-settings.component.html',
  styleUrls: ['./festival-settings.component.css']
})
export class FestivalSettingsComponent implements OnInit {
  idUser: any;
  festsUser: any;
  idFest: any;
  constructor(private festService: FestService) {
    this.idUser = localStorage.getItem('id_user');
  }

  async ngOnInit() {
    const result = await this.festService.getUserFestival(this.idUser);
    console.log(result);
    this.festsUser = result;
  };

  selectFestival(idFestSelected) {

    this.idFest = idFestSelected.value;
    console.log(this.idFest);

  }

}
