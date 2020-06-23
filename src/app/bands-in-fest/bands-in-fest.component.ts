import { Component, Input, OnChanges } from '@angular/core';
import { FestService } from '../fest.service';


@Component({
  selector: 'app-bands-in-fest',
  templateUrl: './bands-in-fest.component.html',
  styleUrls: ['./bands-in-fest.component.css']
})
export class BandsInFestComponent implements OnChanges {
  @Input() idFestBands: any;
  bandsInFest: any;
  constructor(private festService: FestService) { }

  async ngOnChanges() {

    this.bandsInFest = await this.festService.getBands(this.idFestBands);
    console.log(this.bandsInFest);



  }

  onClick() {
    this.festService.setIdFest(this.idFestBands);
  }

}
