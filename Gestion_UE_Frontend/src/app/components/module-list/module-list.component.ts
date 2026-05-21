import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModuleService, Module } from '../../services/module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  modules: Module[] = [];
  loading = false;
  error: string | null = null;

  constructor(private moduleService: ModuleService, private router: Router) { }

  ngOnInit(): void {
    this.loadModules();
  }

  // Charger tous les modules
  loadModules(): void {
    this.loading = true;
    this.error = null;
    this.moduleService.getAllModules().subscribe({
      next: (data) => {
        this.modules = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des modules';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Supprimer un module
  deleteModule(matricule: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce module ?')) {
      this.moduleService.deleteModule(matricule).subscribe({
        next: () => {
          this.loadModules();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }

  // Naviguer vers le formulaire d'édition
  editModule(matricule: string): void {
    this.router.navigate(['/module-form', matricule]);
  }

  // Naviguer vers le formulaire de création
  addModule(): void {
    this.router.navigate(['/module-form']);
  }
}

