import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  faCoffee = faCoffee;

  constructor() { }

  ngOnInit(): void {
  }

}
