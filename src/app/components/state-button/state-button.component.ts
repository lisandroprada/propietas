import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html'
})
export class StateButtonComponent implements OnInit {
  @Input() currentState = 'show-spinner'; // show-spinner | show-success | show-fail
  @Input() message = 'Hola';
  @Input() showMessage = true;
  @Input() isDisabled = false;
  @Input() btnClass = 'btn';
  constructor() { }

  ngOnInit() {
  }

}
