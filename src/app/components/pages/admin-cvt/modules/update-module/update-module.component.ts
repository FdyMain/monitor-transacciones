import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { AdminModulesService } from '../../../../../services/admin-modules/api.admin-modules';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-module',
  standalone: true,
  imports: [CommonModule, NotificationPopupComponent, FormsModule],
  templateUrl: './update-module.component.html'
})
export class UpdateModuleComponent implements OnInit {
  modules: any[] = []; // Lista de módulos disponibles
  showConfirmDialog = false; // Controla la visibilidad del diálogo de confirmación
  selectedModule: any = null; // Módulo seleccionado para eliminar
  editingModule: any = null; // Módulo seleccionado para editar
  updatedModuleName: string = ''; // Nuevo nombre del módulo

  constructor(
    private readonly adminModulesService: AdminModulesService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadModules(); // Cargar módulos al iniciar el componente
  }

  // Cargar la lista de módulos desde el mockup
  loadModules(): void {
    this.adminModulesService.getModules().subscribe({
      next: (modules) => {
        this.modules = modules;
        this.notificationService.showPopup('Módulos cargados exitosamente', 'success');
      },
      error: () => {
        this.notificationService.showPopup('Error al cargar los módulos', 'error');
      }
    });
  }

  // Mostrar el diálogo de confirmación para eliminar
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

  // Habilitar la edición de un módulo
  enableEdit(module: any): void {
    if (this.editingModule && this.editingModule !== module) {
      this.notificationService.showPopup('Solo puede editar un módulo a la vez', 'error');
      return;
    }

    this.editingModule = module;
    this.updatedModuleName = module.name;
  }

  // Cancelar la edición de un módulo
  cancelEdit(): void {
    this.editingModule = null;
    this.updatedModuleName = '';
  }

  // Actualizar el módulo seleccionado
  onUpdate(): void {
    if (!this.editingModule || !this.updatedModuleName.trim()) {
      this.notificationService.showPopup('Debe ingresar un nombre válido para el módulo', 'error');
      return;
    }

    // Consumir el API para actualizar el módulo (o simularlo)
    this.adminModulesService.updateModuleMock(this.editingModule.name, this.updatedModuleName.trim()).subscribe({
      next: () => {
        this.notificationService.showPopup(`Módulo ${this.editingModule.name} actualizado exitosamente`, 'success');
        this.editingModule.name = this.updatedModuleName.trim(); // Actualizar el nombre en la lista
        this.cancelEdit(); // Deshabilitar la edición
      },
      error: () => {
        this.notificationService.showPopup('Error al actualizar el módulo', 'error');
      }
    });
  }
}