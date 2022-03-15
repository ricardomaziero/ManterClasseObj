import { Injectable } from "@angular/core";
import { ClasseRicardo } from "./classe.model";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ClasseService {

  constructor(private http: HttpClient) { }

  readonly baseUrlClasse = 'https://localhost:7194/api/ClasseRicardoes';

  formDataClasse: ClasseRicardo = new ClasseRicardo();

  listClasse: ClasseRicardo[] = [];

  postClasse() {
    return this.http.post(this.baseUrlClasse, this.formDataClasse);
  }

  putClasse() {
    return this.http.put(`${this.baseUrlClasse}/${this.formDataClasse.id}`, this.formDataClasse);
  }

  putClasseStatus(id: number) {
    return this.http.put(`${this.baseUrlClasse}/${id}`, this.formDataClasse);
  }

  deleteClasse(id: number) {
    return this.http.delete(`${this.baseUrlClasse}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseUrlClasse).toPromise()
    .then(res => this.listClasse = res as ClasseRicardo[]);
  }

  getById(id: number) {
    return this.http.get<ClasseRicardo>(`${this.baseUrlClasse}/` + id);
  }

}


