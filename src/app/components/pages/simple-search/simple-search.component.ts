import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProcesoConsultaDialogComponent } from '../proceso-consulta-dialog/proceso-consulta-dialog.component';

@Component({
  selector: 'app-simple-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './simple-search.component.html',
})
export class BatchSimpleComponent {
  
  selectedAplicacion = 'Cajeros';
  selectedTipoTransaccion = 'Retiro cta Corriente';
  numeroCuenta: number | null = null;
  fecha: string | null = null;
  fechaMaxima: string;
  showPopup = false;
  popupStatus: 'success' | 'error' | null = null;
  popupMessage = '';

  constructor(private readonly dialog: MatDialog) {
    // Establecer la fecha máxima como la fecha actual
    this.fechaMaxima = new Date().toISOString().split('T')[0];
  }

  // Tabla para almacenar los registros
  tabla: {
    aplicacion: string;
    tipoTransaccion: string;
    numeroCuenta: number | null;
    fecha: string;
  }[] = [];

  // Método para agregar una fila a la tabla
  agregarFila(): void {
    if (this.camposValidos()) {
      this.tabla.push({
        aplicacion: this.selectedAplicacion,
        tipoTransaccion: this.selectedTipoTransaccion,
        numeroCuenta: this.numeroCuenta,
        fecha: this.fecha ?? new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
      });

      // Limpiar campos después de agregar
      this.selectedAplicacion = 'Cajeros';
      this.selectedTipoTransaccion = 'Retiro cta Corriente';
      this.numeroCuenta = null;
      this.fecha = null;
    }
  }

  // Método para validar que todos los campos estén llenos
  camposValidos(): boolean {
    return (
      this.selectedAplicacion !== null &&
      this.selectedTipoTransaccion !== null &&
      this.numeroCuenta !== null &&
      this.fecha !== null
    );
  }

  // Método para enviar los datos (simulación)
  enviarDatos(): void {
    if (this.tabla.length > 0) {
      console.log('Datos a enviar:', this.tabla);
      // Aquí iría la lógica para enviar los datos a la API
    }
  }
  showPopupMessage(message: string, status: 'success' | 'error'): void {
    this.popupMessage = message;
    this.popupStatus = status;
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }
  abrirDialogoProcesoConsulta(): void {
    if (!this.tabla || this.tabla.length === 0) {
      this.showPopupMessage('No hay datos en la tabla para consultar.', 'error');
      return;
    }
  
    const numerosCuenta = this.tabla.map((fila) => fila.numeroCuenta); // Obtener números de cuenta
  
    this.dialog.open(ProcesoConsultaDialogComponent, {
      width: '90vw', // 90% del ancho de la pantalla
      maxWidth: '90vw', // Evita que se reduzca en pantallas grandes
      height: 'auto', // Permite que crezca según el contenido
      data: { numerosCuenta },
    });
  }
  
}