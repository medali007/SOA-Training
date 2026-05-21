import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UniteEnseignement {
  code: number;
  domaine: string;
  responsable: string;
  credits: number;
  semestre: number;
}

export interface Module {
  matricule: string;
  nom: string;
  coefficient: number;
  volumeHoraire: number;
  type: 'TRANSVERSAL' | 'PROFESSIONNEL' | 'RECHERCHE';
  uniteEnseignement?: UniteEnseignement;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = '/api/module';

  constructor(private http: HttpClient) { }

  // READ - Récupérer tous les modules
  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/list`);
  }

  // CREATE - Ajouter un module
  addModule(module: Module): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, module);
  }

  // UPDATE - Mettre à jour un module
  updateModule(matricule: string, module: Module): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/list/update/${matricule}`, module);
  }

  // DELETE - Supprimer un module
  deleteModule(matricule: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/list/${matricule}`);
  }
}

