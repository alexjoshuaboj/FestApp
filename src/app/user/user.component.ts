import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  notes: string[] = ['Hola', 'Clogs', 'Beunas', 'Moccasins', 'Sneakers'];

  constructor() { }

  ngOnInit(): void {
  }

  getUserSpotify() {

  }

}
