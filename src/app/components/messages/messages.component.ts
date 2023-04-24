import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagensService } from 'src/app/services/messagens.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  fatimes =faTimes
  constructor(public messageService: MessagensService){}
}
