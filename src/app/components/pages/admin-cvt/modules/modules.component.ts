import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { CreateModuleComponent } from "./create-module/create-module.component";
import { UpdateModuleComponent } from "./update-module/update-module.component";
import { DeleteModuleComponent } from "./delete-module/delete-module.component";

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule, CreateModuleComponent, UpdateModuleComponent, DeleteModuleComponent],
  templateUrl: './modules.component.html'
})
export class ModulesComponent {

  activeTab: 'createModule' | 'updateModule' | 'deleteModule' = 'createModule';
  

  setActiveTab(tab: 'createModule' | 'updateModule' | 'deleteModule'): void {
    this.activeTab = tab;
  }

}
