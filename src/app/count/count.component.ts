import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent {

  @Input() quantity: number = 1;

  @Output() increaseEvent = new EventEmitter<void>();
  @Output() decreaseEvent = new EventEmitter<void>();

  onIncrease() {
    this.increaseEvent.emit();
  }

  onDecrease() {
    this.decreaseEvent.emit();
  }
}
