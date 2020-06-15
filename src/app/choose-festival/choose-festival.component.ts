import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-festival',
  templateUrl: './choose-festival.component.html',
  styleUrls: ['./choose-festival.component.css']
})
export class ChooseFestivalComponent implements OnInit {

  typesOfShoes: any[];

  constructor() {
    this.typesOfShoes = [
      {
        'name': 'Boots'
      },
      'Clogs',
      'Loafers',
      'Moccasins',
      'Sneakers'
    ]
  }

  ngOnInit(): void {
  }

}
