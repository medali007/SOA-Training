import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UeService, UniteEnseignement } from '../../services/ue.service';

@Component({
  selector: 'app-ue-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ue-form.component.html',
  styleUrls: ['./ue-form.component.css']
})
export class UeFormComponent implements OnInit {
  ueForm!: FormGroup;
  isEditing = false;
  code: number | null = null;
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private ueService: UeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    // Vérifier si c'est une édition
    this.route.params.subscribe(params => {
      if (params['code']) {
        this.isEditing = true;
        this.code = params['code'];
        this.loadUE(params['code']);
      }
    });
  }

  initializeForm(): void {
    this.ueForm = this.fb.group({
      code: ['', [Validators.required, Validators.min(1)]],
      domaine: ['', [Validators.required, Validators.minLength(3)]],
      responsable: ['', [Validators.required, Validators.minLength(3)]],
      credits: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
      semestre: ['', [Validators.required, Validators.min(1), Validators.max(8)]]
    });
  }

  loadUE(code: number): void {
    this.ueService.getListeUE().subscribe({
      next: (ues) => {
        const ue = ues.find(u => u.code === code);
        if (ue) {
          this.ueForm.patchValue({
            code: ue.code,
            domaine: ue.domaine,
            responsable: ue.responsable,
            credits: ue.credits,
            semestre: ue.semestre
          });
          this.ueForm.get('code')?.disable();
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de l\'UE';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.ueForm.invalid) {
      this.error = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    const formValue = this.ueForm.getRawValue();

    const ueData: UniteEnseignement = {
      code: parseInt(formValue.code),
      domaine: formValue.domaine,
      responsable: formValue.responsable,
      credits: parseInt(formValue.credits),
      semestre: parseInt(formValue.semestre)
    };

    if (this.isEditing && this.code) {
      this.ueService.updateUniteEnseignement(this.code, ueData).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/ue']), 1500);
        },
        error: (err) => {
          this.error = 'Erreur lors de la mise à jour de l\'UE';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.ueService.addUniteEnseignement(ueData).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/ue']), 1500);
        },
        error: (err) => {
          this.error = 'Erreur lors de l\'ajout de l\'UE';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/ue']);
  }
}

