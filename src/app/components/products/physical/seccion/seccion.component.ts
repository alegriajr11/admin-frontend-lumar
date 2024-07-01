import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TableService } from 'src/app/shared/service/table.service';
import { NgbdSortableHeader } from "src/app/shared/directives/NgbdSortableHeader";
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { SeccionService } from 'src/app/shared/service/productos/seccion/seccion.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ok } from 'assert';


@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.scss',
  providers: [TableService, DecimalPipe],
})
export class SeccionComponent {

  public closeResult: string;

  modalRef: NgbModalRef;


  //DTO SECCION
  seccionDto: SeccionDto[];
  newSeccion: SeccionDto = null
  public page = 1
  public pageSize = 10

  //Variable para agregar seccion
  secc_nombre: string


  //LISTA VACIA
  listaVacia: any = undefined

  searchText;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private modalService: NgbModal,
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

  // Método para calcular el ID global
  calcularIDGlobal(index: number, currentPage: number, itemsPerPage: number): number {
    return index + 1 + (currentPage - 1) * itemsPerPage;
  }

  //ELIMINAR SECCION
  eliminarSeccion(seccionId: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta sección?',
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fc5c04',
      cancelButtonColor: '#000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seccionService.eliminarSeccion(seccionId)
          .subscribe(
            (response) => {
              // Manejar respuesta exitosa (eliminación exitosa)
              Swal.fire({
                title: '¡Sección eliminada!',
                text: response.mensaje,
                icon: 'success',
                confirmButtonColor: '#fc5c04'
              });
              // Actualizar la lista de secciones en la vista
              this.listarSecciones();
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
                title: 'Error al eliminar la sección',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#fc5c04'
              });
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Sección a salvo',
          icon: 'error',
          confirmButtonColor: '#fc5c04'  // Cambia el color del botón "OK" cuando se cancela
        });
      }
    });
  }
  
  registrarSeccion(): void {
    if (!this.secc_nombre || this.secc_nombre.trim().length === 0) {
      this.toastrService.error('Debe ingresar un nombre para la sección', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }

    this.newSeccion = new SeccionDto(this.secc_nombre);
    this.seccionService.crearSeccion(this.newSeccion).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        //Cerrar el modal
        this.modalRef.close();
        //Refrescar la vista de secciones
        this.listarSecciones();
        this.secc_nombre = '';
      },
      (error) => {
        console.error('Error al crear la sección:', error);
        const errorMessage = error.error?.message || 'Error al crear la sección';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }


}
