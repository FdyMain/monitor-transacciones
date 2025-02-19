import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminModulesService {
  private readonly apiUrl = 'https://api.example.com';

  constructor(private readonly http: HttpClient) {}

  // Método para crear un módulo
  createModule(moduleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/modules`, moduleData);
  }

  // Método para obtener todos los módulos (opcional, si lo necesitas)
  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules`);
  }

  // Método para eliminar un módulo por nombre
  deleteModule(moduleName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/modules/${moduleName}`);
  }

  // Método para simular la eliminación de un módulo (mockup)
  deleteModuleMock(moduleName: string): Observable<any> {
    console.log('Módulo eliminado (simulación):', moduleName);
    return of({ success: true, message: 'Módulo eliminado exitosamente' });
  }

  // Método para simular la creación de un módulo (mockup)
  createModuleMock(moduleData: any): Observable<any> {
    console.log('Módulo creado (simulación):', moduleData);
    return of({ success: true, message: 'Módulo creado exitosamente' });
  }
}