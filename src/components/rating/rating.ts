import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {

  @Input() showRemoveButton;
  @Input() showUpdateButton;
  @Input() rating;

  @Output() onRemoveRating = new EventEmitter();
  @Output() onUpdateRating = new EventEmitter();

  constructor() {
  }

  removeRating(rating, event) {
    this.onRemoveRating.emit(this.rating);
  }

  updateRating(rating, event) {
    this.onUpdateRating.emit(this.rating);
  }

}
