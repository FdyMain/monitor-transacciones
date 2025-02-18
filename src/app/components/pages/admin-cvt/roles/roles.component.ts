import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CreateRolComponent } from "./create-rol/create-rol.component";
import { UpdateRolComponent } from "./update-rol/update-rol.component";
import { DeleteRolComponent } from "./delete-rol/delete-rol.component";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, CreateRolComponent, UpdateRolComponent, DeleteRolComponent],
  templateUrl: './roles.component.html'
})
export class RolesComponent {

  activeTab: 'createRol' | 'updateRol' | 'deleteRol' = 'createRol';
  

  setActiveTab(tab: 'createRol' | 'updateRol' | 'deleteRol' = 'createRol'): void {
    this.activeTab = tab;
  }


}
