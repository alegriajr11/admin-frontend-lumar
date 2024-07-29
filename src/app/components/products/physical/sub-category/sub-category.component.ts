import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { CATEGORY, Category } from 'src/app/shared/tables/category';
import { TableService } from '../../../../shared/service/table.service';
import { SortEvent } from '../../../../shared/directives/shorting.directive';
import { NgbdSortableHeader } from "../../../../shared/directives/NgbdSortableHeader";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoriaService } from 'src/app/shared/service/productos/subcategoria/subcategoria.service';
import { SubcategoriaDto } from 'src/app/models/subcategoria/subcategoria.dto';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [TableService, DecimalPipe],
})


export class SubCategoryComponent {
  public closeResult: string;
  modalRef: NgbModalRef;

  subcategoriaDto: SubcategoriaDto[]

  public page = 1
  public pageSize = 10
  listaVacia = undefined



  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private modalService: NgbModal,
    private subcategoriaService: SubcategoriaService
  ) { }

  ngOnInit() {
    this.listarSubCategorias();
  }


  //Abrir Modal
  open(content) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then((result) => {
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

  // Método para calcular el ID global
  calcularIDGlobal(index: number, currentPage: number, itemsPerPage: number): number {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  }


  //LISTAR SUBCATEGORIAS
  listarSubCategorias(): void {
    this.subcategoriaService.listaSubcategoria().subscribe(
      data => {
        this.subcategoriaDto = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message
      }
    )
  }
}
