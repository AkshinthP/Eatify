import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  // BehaviorSubject so we can keep latest value & observe changes
  private itemCountSubject = new BehaviorSubject<number>(0);

  // Observable for components to subscribe
  itemCount$: Observable<number> = this.itemCountSubject.asObservable();

  constructor() { }

  incrementCount(): void {
    const current = this.itemCountSubject.value;
    this.itemCountSubject.next(current + 1);
  }

  // Decrease count
  decrementCount(): void {
    const current = this.itemCountSubject.value;
    if (current > 0) {
      this.itemCountSubject.next(current - 1);
    }
  }

  // Reset count
  resetCount(): void {
    this.itemCountSubject.next(0);
  }

  // Set count directly (useful if syncing with cart items)
  setCount(count: number): void {
    this.itemCountSubject.next(count);
  }
}
