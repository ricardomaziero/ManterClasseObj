import { ClasseService } from './../../Shared/classe.service';
import { Component, OnInit } from '@angular/core';
import { ClasseRicardo } from 'src/app/Shared/classe.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-classe-objeto',
  templateUrl: './classe-objeto.component.html',
  styleUrls: ['./classe-objeto.component.scss']
})
export class ClasseObjetoComponent implements OnInit {

  public classes: ClasseRicardo[] = [];

  public classe: any = [];

  service: ClasseService;

  router: RouterModule;

  constructor(

    private http: HttpClient,
    service: ClasseService,
    router: Router,
    private _toastrService: ToastrService

  ) {

    this.service = service;
    this.router = Router;

  }

  ngOnInit(): void {
    this.service.refreshList();
    /* this.getClasses(); */
  }

  onSubmit(form: NgForm) {
    this.service.postClasse().subscribe(
      response => {

        /* this.getClasses(); */
        this.resetForm(form);
        this._toastrService.success("Classe registrada e ativa");
        this.service.refreshList();

      },

    )
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataClasse = new ClasseRicardo();
  }

  public getClasses(): void {
    this.http.get(this.service.baseUrlClasse).subscribe(
    (response) => {
        this.classe = response;
      },
    );

  }

  clicarPreencher(classe: ClasseRicardo) {
    this.service.formDataClasse = Object.assign({}, classe);
  }

  updateRecord(form: NgForm) {
    this.service.putClasse().subscribe(
      (res: any) => {
        this.getClasses();
        this.resetForm(form);
        this._toastrService.info(' Editado com sucesso.');
        this.service.refreshList();
      },

      (error) => {
        if (error.status == 400) {
          console.log(error);
          this._toastrService.error(error.error);
        }
      }

    );

  }

}
