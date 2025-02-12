import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer  } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  // Simular la primera API
  consultarApi(cuenta: number): Observable<any> {
    return of({ status: 200 }).pipe(delay(3000)); // Simula 3 segundos de retraso
  }

  // Simular la segunda API
  consultarApi2(cuenta: number): Observable<any> {
    return of({ status: 200 }).pipe(delay(3000)); // Simula 3 segundos de retraso
  }

  // Simular la segunda API (error HTTP 500)
  consultarApi2Error(cuenta: number): Observable<any> {
    return timer(3000).pipe(
      switchMap(() => throwError(() => ({ status: 500, message: 'Error interno del servidor' })))
    );
  }

  // Simular la tercera API
  consultarApi3(cuenta: number): Observable<any> {
    return of({ status: 200 }).pipe(delay(3000)); // Simula 3 segundos de retraso
  }

  // Simular la cuarta API
  consultarApi4(cuenta: number): Observable<any> {
    return of({ status: 200 }).pipe(delay(3000)); // Simula 3 segundos de retraso
  }
}