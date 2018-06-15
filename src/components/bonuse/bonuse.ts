import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bonuse',
  templateUrl: 'bonuse.html'
})
export class BonuseComponent {

  @Input() bonuse;
  @Input() showControlButtons;
  @Input() globalHost;

  @Output() onRemovePromo = new EventEmitter();
  @Output() onUpdatePromo = new EventEmitter();

  constructor() {
  }

  removePromo(bonuse, $event) {
    $event.stopPropagation();
    this.onRemovePromo.emit(this.bonuse);
  }

  updatePromo(bonuse, $event) {
    $event.stopPropagation();
    this.onUpdatePromo.emit(this.bonuse);
  }
}
