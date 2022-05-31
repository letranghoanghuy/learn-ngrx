import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  // @Input() counter1;
  counter1: number;
  // counter$: Observable<{counter: number}>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getCounter).subscribe((counter)=>{
      console.log('get counter')
      this.counter1 = counter;
    })
    // this.counter$ = this.store.select('counter');
  }

}
