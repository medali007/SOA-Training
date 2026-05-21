import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UeService, UniteEnseignement } from '../../services/ue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ue-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css']
})
export class UeListComponent implements OnInit {
  unitesEnseignement: UniteEnseignement[] = [];
  loading = false;
  error: string | null = null;

  constructor(private ueService: UeService, private router: Router) { }

  ngOnInit(): void {
    this.loadUE();
  }

  // Charger toutes les UE
  loadUE(): void {
    this.loading = true;
    this.error = null;
    this.ueService.getListeUE().subscribe({
      next: (data) => {
        this.unitesEnseignement = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des unités d\'enseignement';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Supprimer une UE
  deleteUE(code: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette unité d\'enseignement ?')) {
      this.ueService.deleteUniteEnseignement(code).subscribe({
        next: () => {
          this.loadUE();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }

  // Naviguer vers le formulaire d'édition
  editUE(code: number): void {
    this.router.navigate(['/ue-form', code]);
  }

  // Naviguer vers le formulaire de création
  addUE(): void {
    this.router.navigate(['/ue-form']);
  }
}

