import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private readonly apiUrl = 'https://api.example.com';

  constructor(private readonly http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  // getUserByNetworkUser(networkUser: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/users/network/${networkUser}`);
  // }

  getUserByNetworkUser(networkUser: string): Observable<any> {
    // Simula un usuario encontrado
    const mockUser = {
      firstName: 'Juan',
      middleName: 'Carlos',
      lastName: 'Pérez',
      secondLastName: 'Gómez',
      role: 'Rol_Uno'
    };
  
    return of(mockUser); // Devuelve el usuario simulado como una respuesta exitosa
  }
}
