import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { AdminRolesService } from '../../../../../services/admin-roles/api.admin-roles';

@Component({
  selector: 'app-update-rol',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationPopupComponent],
  templateUrl: './update-rol.component.html'
})
export class UpdateRolComponent {
  searchForm: FormGroup;
  updateForm: FormGroup;
  roleFound = false;
  availableModules: string[] = [];
  addedModules: string[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly adminRolesService: AdminRolesService
  ) {
    this.searchForm = this.fb.group({
      rolName: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.updateForm = this.fb.group({
      selectedModule: ['']
    });
  }

  onSearch(): void {
    this.markFormGroupTouched(this.searchForm);
  
    if (this.searchForm.invalid) {
      this.notificationService.showPopup('Debe diligenciar el campo de rol con al menos 3 caracteres', 'error');
      return;
    }
  
    const rolName = this.searchForm.value.rolName.trim();
  
    this.adminRolesService.getRoleByName(rolName).subscribe({
      next: (roleData) => {
        this.roleFound = true;
        this.addedModules = [...roleData.modules]; // Clonamos la lista para evitar referencia
        this.availableModules = ['modulo_1', 'modulo_2', 'modulo_3'].filter(m => !this.addedModules.includes(m));
      },
      error: () => {
        this.roleFound = false;
        this.notificationService.showPopup('Rol no encontrado', 'error');
      }
    });
  }

  addModule(): void {
    const selectedModule = this.updateForm.get('selectedModule')?.value;
  
    if (!selectedModule) {
      this.notificationService.showPopup('Debe seleccionar un módulo', 'error');
      return;
    }
  
    // ✅ Agregar módulo correctamente
    this.addedModules.push(selectedModule);
    this.availableModules = this.availableModules.filter(m => m !== selectedModule);
    
    // ✅ Resetear el select y forzar actualización
    this.updateForm.patchValue({ selectedModule: '' });
    this.updateForm.get('selectedModule')?.updateValueAndValidity();
  
    this.notificationService.showPopup(`Módulo ${selectedModule} agregado`, 'success');
  }

  removeModule(modulo: string): void {
    this.availableModules.push(modulo);
    this.addedModules = this.addedModules.filter(m => m !== modulo);
  }

  onUpdateRole(): void {
    if (!this.roleFound || this.addedModules.length === 0) {
      this.notificationService.showPopup('Debe diligenciar todos los campos', 'error');
      return;
    }

    const rolName = this.searchForm.value.rolName.trim();
    const roleData = { roleName: rolName, modules: this.addedModules };

    this.adminRolesService.updateRole(rolName, roleData).subscribe({
      next: () => this.notificationService.showPopup('Rol actualizado exitosamente', 'success'),
      error: () => this.notificationService.showPopup('Error al actualizar el rol', 'error')
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      control.updateValueAndValidity(); // Forzar actualización de estado de validación
    });
  }
}
