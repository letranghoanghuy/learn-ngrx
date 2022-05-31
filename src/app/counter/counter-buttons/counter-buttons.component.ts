import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { decrement, increment, reset } from '../state/counter.actions';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {
  // @Output() increment = new EventEmitter<void>();
  // @Output() decrement = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  onIncrement1(){
    // this.increment.emit()
    this.store.dispatch(increment())
  }
  onDecrement1(){
    // this.decrement.emit();
    this.store.dispatch(decrement())
  }
  onReset1(){
    // this.reset.emit();
    this.store.dispatch(reset())
  }
}
