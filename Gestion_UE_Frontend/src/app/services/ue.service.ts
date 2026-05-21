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

@Injectable({
  providedIn: 'root'
})
export class UeService {
  private apiUrl = '/api/ue';

  constructor(private http: HttpClient) { }

  // READ - Récupérer toutes les UE
  getListeUE(): Observable<UniteEnseignement[]> {
    return this.http.get<UniteEnseignement[]>(`${this.apiUrl}/list`);
  }

  // CREATE - Ajouter une UE
  addUniteEnseignement(ue: UniteEnseignement): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, ue);
  }

  // UPDATE - Mettre à jour une UE
  updateUniteEnseignement(code: number, ue: UniteEnseignement): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/list/update/${code}`, ue);
  }

  // DELETE - Supprimer une UE
  deleteUniteEnseignement(code: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/list/${code}`);
  }
}

