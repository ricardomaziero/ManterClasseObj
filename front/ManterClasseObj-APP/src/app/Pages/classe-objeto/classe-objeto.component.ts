import { ClasseService } from './../../Shared/classe.service';
import { Component, OnInit } from '@angular/core';
import { ClasseRicardo } from 'src/app/Shared/classe.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string = '';
  filterTerm: string = '';
  filterTerm2: string = '';

  constructor(

    private http: HttpClient,
    service: ClasseService,
    router: Router,
    private _toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal

  ) {

    this.service = service;
    this.router = Router;

  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onSubmit(form: NgForm) {
    this.service.postClasse().subscribe(
      response => {

        this.resetForm(form);
        this._toastrService.success("Classe regisrtada ativa");
        this.service.refreshList();

      },

      (error) => {
        if (error.status == 400) {
          console.log(error);
          this._toastrService.error(error.error);
        }
      }

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

  objetoForm = this.formBuilder.group({
    descricao: [null, Validators.required]
  })

  clicarPreencher(classe: ClasseRicardo) {
    this.service.formDataClasse = Object.assign({}, classe);
  }

  resetObj() {
    this.service.formDataClasse = new ClasseRicardo();
  }

  updateRecord() {
    this.service.putClasse().subscribe(
      (res: any) => {
        this.getClasses();
        this.resetObj();
        this._toastrService.success('Editado com sucesso.');
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

  deleteLogico(obj: ClasseRicardo) {
    this.service.putClasseStatus(obj.id).subscribe(
      res => {
        this._toastrService.info('Registro apagado');
        this.service.refreshList();
        console.log(res)
      },

      (error) => {
        if (error.status == 400) {
          console.log(error);
          this._toastrService.error(error.error);
        }
      }

    );

  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
