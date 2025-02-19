import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../../services/local-services/notification-service/notification-service.component';
import { NotificationPopupComponent } from '../../../../shared/notification-popup/notification-popup.component';
import { AdminModulesService } from '../../../../../services/admin-modules/api.admin-modules';

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationPopupComponent],
  templateUrl: './create-module.component.html'
})
export class CreateModuleComponent {
  createModuleForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminModulesService: AdminModulesService,
    private readonly notificationService: NotificationService
  ) {
    this.createModuleForm = this.fb.group({
      moduleName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Método para crear el módulo
  onCreateModule(): void {
    // Marcar todos los campos como "touched" para mostrar errores de validación
    this.markFormGroupTouched(this.createModuleForm);

    if (this.createModuleForm.invalid) {
      if (this.createModuleForm.get('moduleName')?.errors?.['required']) {
        this.notificationService.showPopup('El nombre del módulo es obligatorio', 'error');
      } else if (this.createModuleForm.get('moduleName')?.errors?.['minlength']) {
        this.notificationService.showPopup('El nombre del módulo debe tener más de 3 caracteres', 'error');
      }
      return;
    }

    const moduleName = this.createModuleForm.value.moduleName.trim();

    // Consumir el API para crear el módulo
    this.adminModulesService.createModuleMock({ name: moduleName }).subscribe({
      next: () => {
        this.notificationService.showPopup('Módulo creado exitosamente', 'success');
        this.createModuleForm.reset(); // Limpiar el formulario después de crear el módulo
      },
      error: () => {
        this.notificationService.showPopup('Error al crear el módulo', 'error');
      }
    });
  }

  // Método para marcar todos los campos del formulario como "touched"
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}