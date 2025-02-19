import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { AdminRolesService } from '../../../../../services/admin-roles/api.admin-roles';

@Component({
  selector: 'app-create-rol',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationPopupComponent],
  templateUrl: './create-rol.component.html'
})
export class CreateRolComponent {
  rolForm: FormGroup;
  availableModules: string[] = ['modulo_1', 'modulo_2', 'modulo_3'];
  addedModules: string[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly adminRolesService: AdminRolesService
  ) {
    this.rolForm = this.fb.group({
      rolName: ['', [Validators.required, Validators.minLength(4)]], // ✅ Mínimo 4 caracteres
      selectedModule: ['']
    });
  }

  addModule(): void {
    this.markFormGroupTouched(this.rolForm);

    const rolName = this.rolForm.get('rolName')?.value.trim();
    const selectedModule = this.rolForm.get('selectedModule')?.value;

    // **Validación combinada: Ambos campos deben estar llenos**
    if (!rolName || rolName.length <= 3 || !selectedModule) {
      this.notificationService.showPopup('Debe seleccionar los campos obligatorios', 'error');
      return;
    }

    // **Agregar módulo a la lista**
    this.addedModules.push(selectedModule);

    // **Eliminar módulo del select**
    this.availableModules = this.availableModules.filter(m => m !== selectedModule);

    // **Limpiar el select**
    this.rolForm.patchValue({ selectedModule: '' });

    this.notificationService.showPopup(`Módulo ${selectedModule} agregado`, 'success');
  }

  onCreateRole(): void {
    this.markFormGroupTouched(this.rolForm);

    const rolName = this.rolForm.get('rolName')?.value.trim();

    // **Validación combinada: El usuario debe ingresar un rol y al menos un módulo**
    if (!rolName || rolName.length <= 3 || this.addedModules.length === 0) {
      this.notificationService.showPopup('Debe diligenciar todos los campos', 'error');
      return;
    }

    const roleData = {
      roleName: rolName,
      modules: this.addedModules
    };

    this.adminRolesService.createRole(roleData).subscribe({
      next: () => {
        this.notificationService.showPopup('Rol creado exitosamente', 'success');
        this.rolForm.reset();
        this.addedModules = [];
        this.availableModules = ['modulo_1', 'modulo_2', 'modulo_3'];
      },
      error: () => {
        this.notificationService.showPopup('Error al crear el rol', 'error');
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.updateValueAndValidity(); // Forzar actualización de estado de validación
    });
  }
}
