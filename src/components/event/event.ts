import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'event',
  templateUrl: 'event.html'
})
export class EventComponent {
  @Input() event;
  @Input() showControlButtons;
  @Input() globalHost;

  @Output() onRemovePromo = new EventEmitter();
  @Output() onUpdatePromo = new EventEmitter();

  constructor() {
  }

  removePromo(event, $event) {
    $event.stopPropagation();
    this.onRemovePromo.emit(this.event);
  }

  updatePromo(event, $event) {
    $event.stopPropagation();
    this.onUpdatePromo.emit(this.event);
  }
}
