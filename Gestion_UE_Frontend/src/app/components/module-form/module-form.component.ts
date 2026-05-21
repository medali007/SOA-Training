import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService, Module } from '../../services/module.service';
import { UeService, UniteEnseignement } from '../../services/ue.service';

@Component({
  selector: 'app-module-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.css']
})
export class ModuleFormComponent implements OnInit {
  moduleForm!: FormGroup;
  unitesEnseignement: UniteEnseignement[] = [];
  isEditing = false;
  matricule: string | null = null;
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private moduleService: ModuleService,
    private ueService: UeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUnitesEnseignement();

    // Vérifier si c'est une édition
    this.route.params.subscribe(params => {
      if (params['matricule']) {
        this.isEditing = true;
        this.matricule = params['matricule'];
        this.loadModule(params['matricule']);
      }
    });
  }

  initializeForm(): void {
    this.moduleForm = this.fb.group({
      matricule: ['', [Validators.required, Validators.minLength(3)]],
      nom: ['', [Validators.required, Validators.minLength(3)]],
      coefficient: ['', [Validators.required, Validators.min(1)]],
      volumeHoraire: ['', [Validators.required, Validators.min(1)]],
      type: ['PROFESSIONNEL', Validators.required],
      codeUE: ['', Validators.required]
    });
  }

  loadUnitesEnseignement(): void {
    this.ueService.getListeUE().subscribe({
      next: (data) => {
        this.unitesEnseignement = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des UE', err);
      }
    });
  }

  loadModule(matricule: string): void {
    this.moduleService.getAllModules().subscribe({
      next: (modules) => {
        const module = modules.find(m => m.matricule === matricule);
        if (module) {
          this.moduleForm.patchValue({
            matricule: module.matricule,
            nom: module.nom,
            coefficient: module.coefficient,
            volumeHoraire: module.volumeHoraire,
            type: module.type,
            codeUE: module.uniteEnseignement?.code
          });
          this.moduleForm.get('matricule')?.disable();
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du module';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.moduleForm.invalid) {
      this.error = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    const formValue = this.moduleForm.getRawValue();
    const ue = this.unitesEnseignement.find(u => u.code === parseInt(formValue.codeUE));

    const moduleData: Module = {
      matricule: formValue.matricule,
      nom: formValue.nom,
      coefficient: parseInt(formValue.coefficient),
      volumeHoraire: parseInt(formValue.volumeHoraire),
      type: formValue.type,
      uniteEnseignement: ue
    };

    if (this.isEditing && this.matricule) {
      this.moduleService.updateModule(this.matricule, moduleData).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/modules']), 1500);
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour du module';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.moduleService.addModule(moduleData).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/modules']), 1500);
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'ajout du module';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/modules']);
  }
}

