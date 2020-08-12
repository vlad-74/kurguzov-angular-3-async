export const FUNC = {
  forkJoin: `<H3><pre>
    // forkJoin - одновренно выведет все в виде массива

    forkJoin(
      of(55).pipe(delay(1500),tap(vl => console.log(vl))),
      of(22).pipe(delay(1000),tap(vl => console.log(vl))),
      of(33).pipe(tap(vl => console.log(vl)))
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log(forkJoin, vl));

    // Результат  в консоли: [33, 22, 55 ]
  </pre></H3>`,
  concat: `<H3><pre>
    // concat - когда важен порядок вывода последовательностей'

    concat(
      of('a', 'b', 'c'),
      interval(500).pipe(take(3)),
      from(['d', 3, 'e', 4])
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('concat - ', vl));

    // Результат  в консоли: 'a', 'b', 'c', 0, 1, 2, 'd', 3, 'e', 4
  </pre></H3>`,
  switchMap: `<H3><pre>
    // switchMap - делает complete для предыдущего Observable.'

    of(1, 2, 4)
      .pipe(switchMap(vl => of(vl).pipe(delay(20000 / vl))))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('switchMap - ', vl));

      // Результат  в консоли: 4 примерно через 5 секунд
  </pre></H3>`,
  mergeMap: `<H3> <pre>
    // mergeMap - значения выстреливают по мере поступления.'

    of(100, 200, 400)
      .pipe( mergeMap(vl => of(vl).pipe(delay(1000 / vl))))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('mergeMap - ', vl));

      // Результат  в консоли: 400, 200, 100
  </pre></H3>`,
  tap: `<H3><pre>
    // tap - отладка: выполнения какого-либо действия
    
    from(['a', 'b', 'c'])
      .pipe(tap( vl => console.log('tap - ', vl) ))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log(vl));

      // Результат  в консоли: 'tap - a', 'a', 'tap - b', 'b', 'tap - c', 'c'
  </pre></H3>`,
  pairwise: `<H3><pre>
    // pairwise - эмитит предыдущее и текущее значения как массив

    interval(1000)
      .pipe(pairwise(), take(5))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('pairwise - ', vl));

      // Результат  в консоли: [0,1], [1,2], [2,3], [3,4], [4,5]
  </pre></H3>`,
  map: `<H3> <pre>
    // map -  работает аналогично нативному методу map

    from([7, 21, 10])
      .pipe(map(num => num <= 10 ? 1 : 0))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('map - ', vl));

      // Результат  в консоли: 1, 0, 1
  </pre></H3>`,
  take: `<H3><pre>
    // take -  задаем кол-во элементов, которые мы хотим взять

    range(0, 100)
      .pipe(take(10))
      .pipe(takeUntil(destroyed))
      .subscribe(vl => console.log('take - ', vl)); 

      // Результат  в консоли: от 0 до 9
  </pre></H3>`,
  delay: `<H3><pre>
    // delay -  выводит последовательность через определенное время.

    forkJoin(
      of(55).pipe(delay(1500),tap(vl => console.log(vl))),
      of(22).pipe(delay(1000),tap(vl => console.log(vl))),
      of(33).pipe(tap(vl => console.log(vl)))
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('forkJoin', vl));

    // Результат  в консоли:[33, 22, 55 ]
  </pre></H3>`,
  Observable: `<H3> <pre>
    // Observable -  асинхронный наблюдатель.

    const obs = new Observable((sub) => {
      sub.next(1)
      sub.next(21)
      setTimeout(() => { sub.error(3) }, 500)
    })

    obs.subscribe(
      (vl) => console.log('Observable', vl),
      (err) => console.log('Observable Error: ', err),
      () => console.log('Completed') // НЕ ВСЕГДА ОТРАБАТЫВАЕТ!!!!
    )
    // Результат  в консоли: Observable 1 Observable 21 Observable Error: 3 */
  </pre></H3>`,
  Subject: `<H3><pre>
    // Subject -  отправляет данные одновременно множеству "потребителей".

      const sbj = new Subject()
      sbj.subscribe((vl) => console.log('Subject - 1st:' + vl))
      sbj.next(3)
      sbj.subscribe((vl) => console.log('Subject - 2nd:' + vl))
      sbj.next(9)

      // Результат  в консоли: 1st: 3; 1st: 9; 2nd: 9; */
  </pre></H3>`,
  BehaviorSubject: `<H3><pre>
    // BehaviorSubject -  хранит в себе последнее отправленное им значение.

    const Bsbj = new BehaviorSubject(5)
    Bsbj.subscribe((vl) => console.log('BehaviorSubject - 1st:' + vl))
    Bsbj.subscribe((vl) => console.log('BehaviorSubject - 2nd:' + vl))
    Bsbj.next(7)

    // Результат  в консоли: 1st: 5; 2nd: 5; 1st: 7; 2nd: 7; */
  </pre></H3>`,
  combineLatest: `<H3> <pre>
    // combineLatest - rогда эмит, эмитит последние значения от каждого .

    combineLatest(
      of(3, 6, 9),
      interval(500).pipe(take(3))
    )
    .pipe(takeUntil(destroyed))
    .subscribe(vl => console.log('combineLatest - ', vl));

    // Результат  в консоли: [9, 0], [9, 1], [9, 2]
  </pre></H3>`,
  fromEvent: `<H3><pre>
    // fromEvent - первым указываем КОГО слушаем; 2-м само событие..

    fromEvent(document, 'mousemove')
      .pipe(takeUntil(destroyed))
      .subscribe((ev) => { console.log('Mouse event: ', ev) })
    </pre></H3>`,
  throwError:`<H3><pre>
    // throwError - сразу сделает error.

    interval(1000).pipe(
      mergeMap(x => x === 2
        ? throwError('Twos are bad')
        : of('a', 'b', 'c')
      ),
    )
    .pipe(takeUntil(destroyed))
    .subscribe(x => console.log(x), e => console.error(e));

    // Результат  в консоли: a,b,c, a,b,c,Twos are bad
  </pre><H3>`,
  retry:`<H3><pre>
    // retry - повторяет последовательность N раз.

    interval(1000)
    .pipe(
      mergeMap(val => {
        if(val > 3){ return throwError('Error!');}
        return of(val);
      }),
      retry(2) // retry 2 times on error
    )
    .pipe(takeUntil(destroyed))
    .subscribe(x => console.log(x), e => console.error(e: Retried 2 times then quit!));

    // Результат  в консоли: 0,1,2,3, 0,1,2,3, 0,1,2,3, Error!: Retried 2 times then quit!

  </pre><H3>`,
  promiseStart: `<H3><pre>
    Promise обрабатывает одно событие, когда асинхронная операция завершается успешно или с ошибкой.
    Promise после reject/resolve – неизменны

    Observable:
      как бы поток - позволяет пропускать ноль или более событий,а обратный вызов вызывается для каждого события.
      запрос может быть отменен, если какая-либо дорогостоящая асинхронная операция больше не требуется
      Observable позволяет отменить подписку
  </pre><H3>`,
  Promiseall: `<H3><pre>
    // Promise.all - одновренно выведет все в виде массива.

    Promise.all ([
      fetch('https://jsonplaceholder.typicode.com/todos/1'),
      fetch('https://jsonplaceholder.typicode.com/todos/2')
    ]).then(
      async([fetch1, fetch2]) => {
        const a = await fetch1.json();
        const b = await fetch2.json();
        return [a, b]
      }
    )
    .then((responseText) => { console.log(responseText);})
    .catch((err) => { console.log(err); });

    // 0: {userId: 1, id: 1, title: "delectus aut autem", completed: false}
    // 1: {userId: 1, id: 2, title: "quis ut nam facilis et officia qui", completed: false}
  </pre><H3>`,
  promise: `<H3><pre>
    // promise - асинхронное выполнение.

    let  promise = new Promise(( resolve, reject ) => { setTimeout(() =>  resolve(1), 1000);  });

    promise
      .then((result) => {  console.log(result); return result * 2; })
      .then((result) => {  console.log(result); return result * 2; })
      .then((result) => {  console.log(result); return result * 2; })
      .catch(err => console.log('catch = ', err))
      .finally(() => console.log("Промис завершён"))

    // Результат  в консоли: 1, 2, 4 и Промис завершён
  </pre><H3>`,
  resolve: `<H3><pre>
    // resolve - моментальное выполнение.

    let promise = new Promise(resolve => resolve("готово!"));
      promise.then(console.log); 
    }

   // Результат  в консоли: готово
  </pre><H3>`,
  race: `<H3><pre>
    // race - результатом будет только первый успешно выполнившийся промис из списка

    Promise.race([
      fetch('https://jsonplaceholder.typicode.com/todos/1'),
      fetch('https://jsonplaceholder.typicode.com/todos/2')
    ])
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((err) => { console.log(err); });
    }

    // Результат  в консоли: ...один из
  </pre><H3>`,
  async: ` <H3><pre>
    // async - синхронный асинхрон

    async function showAvatar() {
      let response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      let user = await response.json();

      let githubResponse = await fetch(https://api.github.com/users/{user.username});
      let githubUser = await githubResponse.json();
    
      // ждём 3 секунды
        await new Promise((resolve, reject) => setTimeout(resolve, 3000));

      return githubUser;
    }

    showAvatar()
      .then(res => console.log('res', res))


    // Результат  в консоли:res {login: "bret", id: 23461, node_id: "MDQ6VXNlcjIzNDYx", avatar_url: …}
  </pre><H3>`
}
