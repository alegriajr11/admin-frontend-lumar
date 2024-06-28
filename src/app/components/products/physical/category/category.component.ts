import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Category, CATEGORY } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableService } from 'src/app/shared/service/table.service';
import { SortEvent } from 'src/app/shared/directives/shorting.directive';
import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
import { CategoriaService } from 'src/app/shared/service/productos/categoria/categoria.service';
import { CategoriaDto } from 'src/app/models/categoria/categoria.dto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [TableService, DecimalPipe],
})


export class CategoryComponent implements OnInit {
  public closeResult: string;

  categoriaDto: CategoriaDto[]
  //LISTA VACIA
  listaVacia: any = undefined
  public page = 1
  public pageSize = 10

  searchText;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService
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
    this.listarCategorias();
  }

  //Solicitud listar categorias
  listarCategorias(): void {
    this.categoriaService.listaCategorias().subscribe(
      data => {
        this.categoriaDto = data
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
