import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { AdminModulesService } from '../../../../../services/admin-modules/api.admin-modules';

@Component({
  selector: 'app-delete-module',
  standalone: true,
  imports: [CommonModule, NotificationPopupComponent],
  templateUrl: './delete-module.component.html'
})
export class DeleteModuleComponent implements OnInit {
  modules: any[] = []; // Lista de módulos disponibles
  showConfirmDialog = false; // Controla la visibilidad del diálogo de confirmación
  selectedModule: any = null; // Módulo seleccionado para eliminar

  constructor(
    private readonly adminModulesService: AdminModulesService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadModules(); // Cargar módulos al iniciar el componente
  }

  // Cargar la lista de módulos desde el mockup
  loadModules(): void {
    // Simulación de datos de prueba (mockup)
    this.modules = [
      { name: 'Modulo_1' },
      { name: 'Modulo_2' },
      { name: 'Modulo_3' },
      { name: 'Modulo_4' },
      { name: 'Modulo_5' }
    ];

    // Mostrar notificación de éxito
    this.notificationService.showPopup('Módulos cargados exitosamente', 'success');
  }

  // Mostrar el diálogo de confirmación
  confirmDelete(module: any): void {
    this.selectedModule = module;
    this.showConfirmDialog = true;
  }

  // Cerrar el diálogo de confirmación
  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.selectedModule = null;
  }

  // Eliminar el módulo seleccionado
  onDelete(): void {
    if (!this.selectedModule) {
      this.notificationService.showPopup('No hay módulo seleccionado para eliminar', 'error');
      return;
    }

    // Simulación de eliminación de módulo
    this.modules = this.modules.filter(module => module.name !== this.selectedModule.name);
    this.notificationService.showPopup(`Módulo ${this.selectedModule.name} eliminado exitosamente`, 'success');
    this.showConfirmDialog = false;
    this.selectedModule = null;
  }
}