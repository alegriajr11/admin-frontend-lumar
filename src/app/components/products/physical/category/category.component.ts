import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Category, CATEGORY } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableService } from 'src/app/shared/service/table.service';
import { SortEvent } from 'src/app/shared/directives/shorting.directive';
import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
import { CategoriaService } from 'src/app/shared/service/productos/categoria/categoria.service';
import { CategoriaDto } from 'src/app/models/categoria/categoria.dto';
import { SeccionService } from 'src/app/shared/service/productos/seccion/seccion.service';
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [TableService, DecimalPipe],
})


export class CategoryComponent implements OnInit {
  public closeResult: string;

  modalRef: NgbModalRef;

  categoriaDto: CategoriaDto[]
  newCategoriaDto: CategoriaDto = null
  //DTO SECCION
  seccionDto: SeccionDto[];
  //LISTA VACIA
  listaVacia: any = undefined
  public page = 1
  public pageSize = 10

  //VARIABLES PARA EL DTO
  cat_nombre: string
  seccion_id: number


  searchText;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService,
    private seccionService: SeccionService,
    private toastrService: ToastrService,
  ) { }


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


  ngOnInit() {
    this.listarCategorias();
    this.listarSecciones();
  }

  //Peticion listar secciones
  listarSecciones(): void {
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


  //METODO CREAR CATEGORIA
  registrarCategoria(): void {
    //SELECCIONAR EL ID DEL SELECT
    var id = (document.getElementById('secc_id')) as HTMLSelectElement
    var sel = id.selectedIndex;
    var opt = id.options[sel]
    var ValorSeccion = (<HTMLSelectElement><unknown>opt).value;
    this.seccion_id = parseInt(ValorSeccion)
    console.log(this.seccion_id)

    if (!this.seccion_id) {
      this.toastrService.error('Debe seleccionar una sección para la categoría', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }

    if (!this.cat_nombre || this.cat_nombre.trim().length === 0) {
      this.toastrService.error('Debe ingresar un nombre para la categoría', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }

    this.newCategoriaDto = new CategoriaDto(this.cat_nombre, this.seccion_id);

    this.categoriaService.createCategoria(this.newCategoriaDto).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        // Cerrar el modal y refrescar la vista
        this.modalRef.close();
        this.listarCategorias();
        this.cat_nombre = '';
      },
      (error) => {
        console.error('Error al crear la categoría:', error);
        const errorMessage = error.error?.message || 'Error al crear la categoría';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }


  //ELIMINAR CATEGORIA
  eliminarCategoria(cat_id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta categoria?',
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fc5c04',
      cancelButtonColor: '#000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(cat_id)
          .subscribe(
            (response) => {
              // Manejar respuesta exitosa (eliminación exitosa)
              Swal.fire({
                title: 'Categoria eliminada!',
                text: response.mensaje,
                icon: 'success',
                confirmButtonColor: '#fc5c04'
              });
              // Actualizar la lista de categorias en la vista
              this.listarCategorias();
            },
            (error) => {
              let errorMessage = '';
              //Verificar si el mensaje error es un array de lo contrario solo accedemos a el sin array
              if (error.error && error.error.message) {
                if (Array.isArray(error.error.message)) {
                  errorMessage = error.error.message[0];
                } else {
                  errorMessage = error.error.message;
                }
              }
              Swal.fire({
                title: 'Error al eliminar la categoria',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#fc5c04'
              });
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Categoria a salvo',
          icon: 'error',
          confirmButtonColor: '#fc5c04'  // Cambia el color del botón "OK" cuando se cancela
        });
      }
    });
  }
}
