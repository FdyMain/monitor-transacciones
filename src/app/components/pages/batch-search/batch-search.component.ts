import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProcesoConsultaDialogComponent } from '../proceso-consulta-dialog/proceso-consulta-dialog.component';

@Component({
  selector: 'app-batch-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule], // <-- Agrega MatDialogModule aquí
  templateUrl: './batch-search.component.html'
})
export class BatchSearchComponent {
  constructor(private readonly dialog: MatDialog) {} // Ahora MatDialog debería funcionar correctamente

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  fileLoaded = false;
  fileContent: string | null = null;
  showPopup = false;
  popupStatus: 'success' | 'error' | null = null;
  popupMessage = '';

  // Agregar la propiedad tabla para evitar el error
  tabla: Array<{ numeroCuenta: string }> = []; // Definirla correctamente como una lista

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = () => {
          this.fileContent = reader.result as string;
          this.fileLoaded = true;
        };
        reader.readAsText(file);
      } else {        
        this.showPopupMessage('Por favor, seleccione un archivo .txt', 'error');
      }
    }
  }

  onConsultar(): void {
    if (!this.fileLoaded) {
      this.showPopupMessage('Por favor, cargue un archivo .txt antes de consultar.', 'error');
      return;
    }
  
    // Simulación de la llamada a la API
    const apiResponse = this.simulateApiCall();
  
    if (apiResponse.status === 200) {
      this.showPopupMessage('Consulta exitosa', 'success');
    } else {
      this.showPopupMessage('Se ha producido un error', 'error');
    }
  }

  private simulateApiCall(): { status: number } {
    return { status: 200 }; // Simulación de una respuesta de API
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
