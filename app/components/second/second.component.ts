import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { SubscribeService } from '../subscribe.service';
import { Observable, ObservableGroup } from '../../inerface/observable';
import { Rx } from '../observable';
import { FUNC } from '../constants';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
})
export class SecondComponent implements OnInit, OnDestroy {
  textCodStart = FUNC.promiseStart
  textCod = this.textCodStart
  promiseControl = new FormControl();
  promiseGroups: ObservableGroup[];

  private readonly destroyed$ = new Subject();

  constructor( private subscribeService: SubscribeService, private rx: Rx) {}

  ngOnInit() {
    this.promiseGroups = [
      {
        name: 'ФУНКЦИОНАЛ',
        promise: [
          {value: 'promise', viewValue: 'promise - асинхронное выполнение'},
          {value: 'resolve', viewValue: 'resolve - моментальное выполнение'},
          {value: 'race', viewValue: 'Promise.race - результатом будет только первый успешно выполнившийся промис из списка'},
          {value: 'Promiseall', viewValue: 'Promise.all(iterable) - одновренно выведет все в виде массива'},
          {value: 'async', viewValue: 'async - синхронный асинхрон'},
        ]
      }
    ];

    this.promiseControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.Resolve_valueChanges(data)
      });
  }
  
  Resolve_valueChanges(data: string) {
    if(!data) {this.textCod = this.textCodStart; return}
    const name = 'func_' + data;
    try{
      this.rx[name](this.destroyed$)
      let textCod = FUNC[data]
      data = data == 'Promiseall' ? 'all' : data

      textCod = textCod.replace(new RegExp(`${data}`,'g'), `<u>${data}</u>`);

      if(data === 'all' || data === 'race') {
        textCod = textCod.replace(/Promise./g, `<u>Promise.</u>`)
      }
      if(data == 'async') textCod = textCod.replace(/await/g, `<u>await</u>`)
      this.textCod = textCod.replace(/Результат  в консоли:/g, `<b>Результат  в консоли:</b>`)
    } catch(e){
      console.log('error', e)
    }
  };
    
  commonSubscribe(data, name?: string){
    this.subscribeService.commonSubscribe(data, this.destroyed$, name)
  }

  ngOnDestroy() { this.subscribeService.commonDestroy(this.destroyed$) }
}

