import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminRolesService {
  private readonly apiUrl = 'https://api.example.com';

  constructor(private readonly http: HttpClient) {}

  createRole(roleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles`, roleData);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }


  getRoleByName(roleName: string): Observable<any> {
    // Simula un rol encontrado
    const mockRole = {
      roleName: 'Administrador',
      modules: ['modulo_1', 'modulo_2']
    };

    return of(mockRole); // Devuelve el rol simulado como una respuesta exitosa
  }

  // ✅ Método para actualizar un rol
  updateRole(roleName: string, roleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/roles/${roleName}`, roleData);
  }

   // Eliminar un rol por nombre
   deleteRole(roleName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles/${roleName}`);
  }
}
