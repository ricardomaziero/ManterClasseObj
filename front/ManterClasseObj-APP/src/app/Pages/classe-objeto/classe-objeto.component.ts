import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClasseService } from './../../Shared/classe.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
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
  modalRef = {} as BsModalRef;

  constructor(

    private http: HttpClient,
    service: ClasseService,
    router: Router,
    private _toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private modalService2: BsModalService

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
    descricao: []
  })

  onSelect(selectedItem: ClasseRicardo) {
    this.getById(selectedItem.id);
  }

  clicarPreencher(classe: ClasseRicardo) {
    this.service.formDataClasse = Object.assign({}, classe);
  }

  resetObj() {
    this.service.formDataClasse = new ClasseRicardo();
  }

  updateRecord() {
    this.service.putClasse().subscribe(
      () => {
        this.getClasses();
        this.resetObj();
        this._toastrService.success('Editado com sucesso.');
        this.service.refreshList();
      },

      (error) => {
        if (error.status == 400 || error.status == 500) {
          console.log(error);
          this._toastrService.error(error.error);
        }
      }

    );

  }

  deleteLogico(obj: ClasseRicardo) {
    this.service.putClasseStatus(obj.id, obj).subscribe(
      res => {
        this._toastrService.warning('Registro apagado');
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
      this.resetObj();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetObj();
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService2.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteLogico(this.service.formDataClasse);
    this.modalRef?.hide();

  }

  decline(): void {
    this.modalRef?.hide();
  }

  public getById(obj: number){
    this.service.getById(obj).subscribe(res =>{
      this.service.formDataClasse = res;
      console.log(this.service.formDataClasse)
    })
  }

}
