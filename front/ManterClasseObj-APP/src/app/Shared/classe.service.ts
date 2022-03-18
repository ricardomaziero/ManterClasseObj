import { Injectable } from "@angular/core";
import { ClasseRicardo } from "./classe.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ClasseService {

  constructor(private http: HttpClient) { }

  readonly baseUrlClasse = 'http://localhost:5194/api/ClasseRicardoes';

  formDataClasse: ClasseRicardo = new ClasseRicardo();

  listClasse: ClasseRicardo[] = [];

  postClasse() {
    return this.http.post(this.baseUrlClasse, this.formDataClasse);
  }

  //http://localhost:5194/api/ClasseRicardoes/1?descricao=testeSwagger123
  putClasse() {
    return this.http.put(`${this.baseUrlClasse}/${this.formDataClasse.id}?descricao=${this.formDataClasse.descricao}`, this.formDataClasse);
  }

  //http://localhost:5194/api/ClasseRicardoes/1/status
  putClasseStatus(id: number, obj: ClasseRicardo) {
    return this.http.put(`${this.baseUrlClasse}/${id}/status`, obj);
  }

  deleteClasse(id: number) {
    return this.http.delete(`${this.baseUrlClasse}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseUrlClasse).toPromise()
    .then(res => this.listClasse = res as ClasseRicardo[]);
  }

  getById(id: number) : Observable<ClasseRicardo>  {
    return this.http.get<ClasseRicardo>(`${this.baseUrlClasse}/` + id);
  }

}


