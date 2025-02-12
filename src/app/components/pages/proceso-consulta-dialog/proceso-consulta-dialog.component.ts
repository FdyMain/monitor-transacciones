import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service-qa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proceso-consulta-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proceso-consulta-dialog.component.html',
  styleUrl: './proceso-consulta-dialog.component.css',
})
export class ProcesoConsultaDialogComponent {
  numerosCuenta: number[] = []; // Inicializar como un array vacío
  cuentaSeleccionada: number | null = null;

  // Estado del flujo por cuenta
  flujosPorCuenta: { [cuenta: number]: any } = {};

  constructor(
    public dialogRef: MatDialogRef<ProcesoConsultaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly apiService: ApiService
  ) {
    // Inicializar numerosCuenta en el constructor
    this.numerosCuenta = data.numerosCuenta;

    // Inicializar el estado de los bloques para cada cuenta
    this.numerosCuenta.forEach((cuenta) => {
      this.flujosPorCuenta[cuenta] = {
        iniciado: false, // Indica si el flujo ya ha sido iniciado
        bloques: [
          { nombre: 'HOST', estado: 'pendiente', mensaje: 'En espera...' },
          { nombre: 'TS', estado: 'pendiente', mensaje: 'En espera...' },
          { nombre: 'ODS', estado: 'pendiente', mensaje: 'En espera...' },
          { nombre: 'CONTABILIDAD', estado: 'pendiente', mensaje: 'En espera...' },
        ],
      };
    });
  }

  
  // Seleccionar una cuenta
  seleccionarCuenta(cuenta: number): void {
    this.cuentaSeleccionada = cuenta;

    // Si el flujo no ha sido iniciado, iniciarlo
    if (!this.flujosPorCuenta[cuenta].iniciado) {
      this.flujosPorCuenta[cuenta].iniciado = true;
      this.iniciarFlujo(cuenta);
    }
  }

  // Método para obtener el estado del spinner
  getSpinnerState(cuenta: number): string {
    const bloques = this.flujosPorCuenta[cuenta]?.bloques;

    if (bloques?.some((b: any) => b.estado === 'error')) {
      return 'red'; // Si hay algún error, el spinner es rojo
    } else if (bloques?.every((b: any) => b.estado === 'completado')) {
      return 'green'; // Si todos los bloques están completados, el spinner es verde
    } else {
      return 'orange'; // Si hay bloques pendientes, el spinner es naranja
    }
  }

  // Método para obtener el estado de las líneas entre bloques
  getLineState(bloque: any): string {
    if (bloque.estado === 'error') {
      return 'red'; // Si el bloque tiene error, la línea es roja
    } else if (bloque.estado === 'completado') {
      return 'green'; // Si el bloque está completado, la línea es verde
    } else {
      return 'gray'; // Si el bloque está pendiente, la línea es gris
    }
  }

  // Iniciar el flujo de APIs para una cuenta específica
  iniciarFlujo(cuenta: number): void {
    const bloques = this.flujosPorCuenta[cuenta].bloques;

    bloques[0].estado = 'pendiente';
    bloques[0].mensaje = 'Consultando API...';

    // Simular API para Bloque_1
    this.apiService.consultarApi(cuenta).subscribe({
      next: (response) => {
        bloques[0].estado = 'completado';
        bloques[0].mensaje = 'API completada (200)';
        this.iniciarBloque2(cuenta);
      },
      error: (error) => {
        bloques[0].estado = 'error';
        bloques[0].mensaje = 'Error en la API';
      },
    });
  }

  // Iniciar Bloque_2 para una cuenta específica
  iniciarBloque2(cuenta: number): void {
    const bloques = this.flujosPorCuenta[cuenta].bloques;

    bloques[1].estado = 'pendiente';
    bloques[1].mensaje = 'Consultando API...';

    // Simular API para Bloque_2
    this.apiService.consultarApi2(cuenta).subscribe({
      next: (response) => {
        bloques[1].estado = 'completado';
        bloques[1].mensaje = 'API completada (200)';
        this.iniciarBloque3y4(cuenta);
      },
      error: (error) => {
        bloques[1].estado = 'error';
        bloques[1].mensaje = 'Error en la API';
      },
    });
  }

  // Iniciar Bloque_3 y Bloque_4 para una cuenta específica
  iniciarBloque3y4(cuenta: number): void {
    const bloques = this.flujosPorCuenta[cuenta].bloques;

    bloques[2].estado = 'pendiente';
    bloques[2].mensaje = 'Consultando API...';
    bloques[3].estado = 'pendiente';
    bloques[3].mensaje = 'Consultando API...';

    // Simular API para Bloque_3
    this.apiService.consultarApi3(cuenta).subscribe({
      next: (response) => {
        bloques[2].estado = 'completado';
        bloques[2].mensaje = 'API completada (200)';
      },
      error: (error) => {
        bloques[2].estado = 'error';
        bloques[2].mensaje = 'Error en la API';
      },
    });

    // Simular API para Bloque_4
    this.apiService.consultarApi4(cuenta).subscribe({
      next: (response) => {
        bloques[3].estado = 'completado';
        bloques[3].mensaje = 'API completada (200)';
      },
      error: (error) => {
        bloques[3].estado = 'error';
        bloques[3].mensaje = 'Error en la API';
      },
    });
  }

  // Obtener los bloques de la cuenta seleccionada
  get bloques(): any[] {
    return this.cuentaSeleccionada ? this.flujosPorCuenta[this.cuentaSeleccionada].bloques : [];
  }
}