import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { ModuleFormComponent } from './components/module-form/module-form.component';
import { UeListComponent } from './components/ue-list/ue-list.component';
import { UeFormComponent } from './components/ue-form/ue-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ModuleListComponent,
    ModuleFormComponent,
    UeListComponent,
    UeFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestion des UE et Modules';
}
