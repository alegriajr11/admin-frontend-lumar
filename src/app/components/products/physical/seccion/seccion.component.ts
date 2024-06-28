import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Category, CATEGORY } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableService } from 'src/app/shared/service/table.service';
import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { SeccionService } from 'src/app/shared/service/productos/seccion/seccion.service';


@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.scss',
  providers: [TableService, DecimalPipe],
})
export class SeccionComponent {

  public closeResult: string;

  //DTO SECCION
  seccionDto: SeccionDto[];
  public page = 1
  public pageSize = 10


  //LISTA VACIA
  listaVacia: any = undefined

  searchText;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private modalService: NgbModal,
    private seccionService: SeccionService,
  ) { }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }


  ngOnInit() {
    this.listarSeccion();
  }


  //Peticion listar secciones
  listarSeccion(): void {
    this.seccionService.listaSeccion().subscribe(
      data => {
        this.seccionDto = data
        this.listaVacia = undefined

      },
      err => {
        this.listaVacia = err.error.message
      }
    )
  }

  // Método para calcular el ID global
  calcularIDGlobal(index: number, currentPage: number, itemsPerPage: number): number {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  }
}
