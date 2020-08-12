import { Injectable } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { CommonHttpRequest } from '../interface/getCommonHttpRequest';

import { Subject, Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })

export class SubscribeService {

  constructor() {}

  ACTIONS = {
      COMMON: {
        forkJoin: (data) => { return of(data)},
      }
  }

  commonSubscribe(request: CommonHttpRequest, destroyed$, type = 'COMMON') {
    this.ACTIONS[type][request.nameRequest](request.data)
      .pipe(takeUntil(destroyed$))
      .subscribe(
        res => { request.callback(res); },
        err => {
          request.errorFn
          ? request.callback(err)
          : console.log( `commonSubscribe - Ошибка - ${request.nameRequest} - `, err )
        }
    );
  }

  commonDestroy(destroyed$){
    destroyed$.next();
    destroyed$.complete();
  }

}
