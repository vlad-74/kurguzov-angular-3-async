import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { SubscribeService } from '../subscribe.service';
import { Observable, ObservableGroup } from '../../inerface/observable';
import { Rx } from '../observable';
import { FUNC } from '../constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})

export class MainComponent implements OnInit, OnDestroy {
  textCodStart = `<H3><pre>
  import { 
    Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject,  
    interval, concat, forkJoin, combineLatest, of, from, fromEvent 
  } from 'rxjs'; 

  import { map, take, delay, tap, mergeMap, pairwise, switchMap } from 'rxjs/operators';
  </pre></H3>`
  textCod = this.textCodStart
  observableControl = new FormControl();
  observableGroups: ObservableGroup[];

  private readonly destroyed$ = new Subject();

  constructor( private subscribeService: SubscribeService, private rx: Rx) {}

  ngOnInit() {
    this.observableGroups = [
      {
        name: 'ФУНКЦИОНАЛ',
        observable: [
          {value: 'forkJoin', viewValue: 'forkJoin - одновренно выведет все в виде массива'},
          {value: 'concat', viewValue: 'concat - когда важен порядок вывода последовательностей'},
          {value: 'switchMap', viewValue: 'switchMap - делает complete для предыдущего Observable.'},
          {value: 'mergeMap', viewValue: 'mergeMap - значения выстреливают по мере поступления'},
          {value: 'pairwise', viewValue: 'pairwise -  эмитит предыдущее и текущее значения как массив'},
          {value: 'take', viewValue: 'take - задаем кол-во элементов, которые мы хотим взять.'},
          {value: 'tap', viewValue: 'tap - отладка: выполнения какого-либо действия.'},
          {value: 'delay', viewValue: 'delay - выводит последовательность через определенное время.'},
          {value: 'retry', viewValue: 'retry - повторяет последовательность N раз.'},
        ]
      },
      {
        name: 'EMITTER',
        observable: [
          {value: 'Subject', viewValue: 'Subject - отправляет данные одновременно множеству "потребителей"'},
          {value: 'BehaviorSubject', viewValue: 'BehaviorSubject - хранит в себе последнее отправленное им значение'},
        ]
      },
      {
        name: 'ОСТАЛЬНЫЕ',
        observable: [
          {value: 'Observable', viewValue: 'Observable - асинхронный наблюдатель'},
          {value: 'combineLatest', viewValue: 'combineLatest - rогда эмит, эмитит последние значения от каждого '},
          {value: 'map', viewValue: 'map -  работает аналогично нативному методу map'},
          {value: 'fromEvent', viewValue: 'fromEvent - первым указываем КОГО слушаем; 2-м само событие.'},
          {value: 'throwError', viewValue: 'throwError - сразу сделает error.'},
        ]
      }
    ];

    this.observableControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.Resolve_valueChanges(data)
      });
  }
  
  Resolve_valueChanges(data) {
    if(!data) {this.textCod = this.textCodStart; return}
    const name = 'func_' + data;
    try{
      this.rx[name](this.destroyed$)
      let textCod = FUNC[data]
      textCod = textCod.replace(new RegExp(`${data}`,'g'), `<u>${data}</u>`);
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
