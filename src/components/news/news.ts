import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: "news",
  templateUrl: "news.html"
})
export class NewsComponent {
  @Input() news;
  @Input() showControlButtons;
  @Input() globalHost;

  @Output() onRemovePromo = new EventEmitter();
  @Output() onUpdatePromo = new EventEmitter();

  constructor() {
  }

  removePromo(news, event) {
    this.onRemovePromo.emit(this.news);
  }

  updatePromo(news, event) {
    this.onUpdatePromo.emit(this.news);
  }
}
