import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  consultarApi(cuenta: number): Observable<any> {
    return this.http.get(`https://api.example.com/consulta1?cuenta=${cuenta}`);
  }

  consultarApi2(cuenta: number): Observable<any> {
    return this.http.get(`https://api.example.com/consulta2?cuenta=${cuenta}`);
  }

  consultarApi3(cuenta: number): Observable<any> {
    return this.http.get(`https://api.example.com/consulta3?cuenta=${cuenta}`);
  }

  consultarApi4(cuenta: number): Observable<any> {
    return this.http.get(`https://api.example.com/consulta4?cuenta=${cuenta}`);
  }
}