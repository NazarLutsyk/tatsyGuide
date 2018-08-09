import {Component, Input} from '@angular/core';

@Component({
  selector: 'empty',
  templateUrl: 'empty.html'
})
export class EmptyComponent {

  @Input() text: string = 'Empty...';

  constructor() {
  }

}
