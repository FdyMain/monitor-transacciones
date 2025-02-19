import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { AdminRolesService } from '../../../../../services/admin-roles/api.admin-roles';


@Component({
  selector: 'app-delete-rol',
  standalone: true,
  imports: [CommonModule, NotificationPopupComponent],
  templateUrl: './delete-rol.component.html'
})
export class DeleteRolComponent implements OnInit {
  roles: any[] = []; // Lista de roles disponibles
  showConfirmDialog = false; // Controla la visibilidad del diálogo de confirmación
  selectedRole: any = null; // Rol seleccionado para eliminar

  constructor(
    private readonly adminRolesService: AdminRolesService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadRoles(); // Cargar roles al iniciar el componente
  }

  // Cargar la lista de roles desde el mockup
  loadRoles(): void {
    // Simulación de datos de prueba (mockup)
    this.roles = [
      { name: 'Rol_1' },
      { name: 'Rol_2' },
      { name: 'Rol_3' },
      { name: 'Rol_4' },
      { name: 'Rol_5' }
    ];

    // Mostrar notificación de éxito
    this.notificationService.showPopup('Roles cargados exitosamente', 'success');
  }

  // Mostrar el diálogo de confirmación
  confirmDelete(role: any): void {
    this.selectedRole = role;
    this.showConfirmDialog = true;
  }

  // Cerrar el diálogo de confirmación
  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.selectedRole = null;
  }

  // Eliminar el rol seleccionado
  onDelete(): void {
    if (!this.selectedRole) {
      this.notificationService.showPopup('No hay rol seleccionado para eliminar', 'error');
      return;
    }

    // Simulación de eliminación de rol
    this.roles = this.roles.filter(role => role.name !== this.selectedRole.name);
    this.notificationService.showPopup(`Rol ${this.selectedRole.name} eliminado exitosamente`, 'success');
    this.showConfirmDialog = false;
    this.selectedRole = null;
  }
}