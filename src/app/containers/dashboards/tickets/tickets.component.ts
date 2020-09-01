import { Component, OnInit, Input } from '@angular/core';
import ticketItems, { ITicket } from 'src/app/data/tickets';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  @Input() inmuebles: any;

  constructor() { }

  data = this.inmuebles;


  ngOnInit() {
  }

}
