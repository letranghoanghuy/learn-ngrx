import { AppState } from './../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement,changeText } from '../state/counter.actions';
import { getName } from '../state/counter.selectors';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  value: number;
  mytestName: string;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getName).subscribe((myName)=>{
      console.log('get name')
      this.mytestName = myName;
    })
  }

  onAdd(){
    this.store.dispatch(customIncrement({count: +this.value}))
  }

  onChangeText(){
    this.store.dispatch(changeText())
  }

}
