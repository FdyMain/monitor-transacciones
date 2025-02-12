import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BatchSearchComponent } from '../batch-search/batch-search.component'; // Importa BatchSearchComponent
import { BatchSimpleComponent } from '../simple-search/simple-search.component'; // Importa BatchSimpleComponent

@Component({
  selector: 'app-cvt',
  standalone: true,
  imports: [
    CommonModule,
    BatchSearchComponent, // Agrega BatchSearchComponent
    BatchSimpleComponent, // Agrega BatchSimpleComponent
  ],
  templateUrl: './cvt.component.html',
})
export class CvtComponent {
  activeTab: 'batch-search' | 'simple-search' = 'batch-search';
  

  setActiveTab(tab: 'batch-search' | 'simple-search'): void {
    this.activeTab = tab;
  }

  
}