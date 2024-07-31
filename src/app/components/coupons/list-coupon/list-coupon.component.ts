import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CuponDto } from 'src/app/models/cupon/cupon.dto';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { CuponService } from 'src/app/shared/service/cupon/cupon.service';
import { TableService } from 'src/app/shared/service/table.service';
import { LISTCOUPLEDB, ListCouponsDB } from 'src/app/shared/tables/list-coupon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
  providers: [TableService, DecimalPipe]
})
export class ListCouponComponent implements OnInit {

  public closeResult: string;

  modalRef: NgbModalRef;

  //ID DEL CUPON
  id_cupon: number

  //Variables controlar la fecha limite
  cup_fecha_inicial: string;

  //DTO CUPON
  cuponDto: CuponDto[]
  //LISTA VACIA
  listaVacia: any = undefined

  upadteCuponForm: FormGroup

  public active = 1;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private cuponService: CuponService,
    private toastrService: ToastrService,
  ) {
    this.upadteCuponForm = this.fb.group({
      cup_titulo: ['', [Validators.required]],
      cup_codigo: ['', [Validators.required]],
      cup_descripcion: ['', [Validators.required]],
      cup_fecha_inicio: ['', [Validators.required]],
      cup_fecha_final: ['', [Validators.required]],
      cup_estado: ['', [Validators.required]],
      cup_cantidad_descuento: ['', [Validators.required]],
      categoriaCatId: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.listarCupones();
  }

  //Solicitud listar cupones
  listarCupones(): void {
    this.cuponService.getAllCupones().subscribe(
      data => {
        this.cuponDto = data
        this.listaVacia = undefined
      },
      err => {
        this.listaVacia = err.error.message
      }
    )
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

  //CARGAR CUPON AL FORMULARIO
  loadCuponData(cuponId: number) {
    this.id_cupon = cuponId
    //Consultar el cupon a actualizar
    this.cuponService.getOneCupon(this.id_cupon).subscribe(data => {
      this.upadteCuponForm.patchValue({
        cup_titulo: data.cup_titulo,
        cup_codigo: data.cup_codigo,
        cup_descripcion: data.cup_descripcion,
        cup_fecha_inicio: data.cup_fecha_inicio,
        cup_fecha_final: data.cup_fecha_final,
        cup_estado: data.cup_estado,
        cup_cantidad_descuento: data.cup_cantidad_descuento,
        categoriaCatId: data.categoria.cat_id,
      });
      //Asignar la fecha inicial a la variable
      this.cup_fecha_inicial = data.cup_fecha_inicio
    });
    
  }

  //Solicitar eliminar cupón
  eliminarCupon(cuponId: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este cupón?',
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fc5c04',
      cancelButtonColor: '#000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuponService.deleteCupon(cuponId)
          .subscribe(
            (response) => {
              // Manejar respuesta exitosa (eliminación exitosa)
              Swal.fire({
                title: 'Cupón eliminado!',
                text: response.mensaje,
                icon: 'success',
                confirmButtonColor: '#fc5c04'
              });
              // Actualizar la lista de categorias en la vista
              this.listarCupones();
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
                title: 'Error al eliminar el cupón',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#fc5c04'
              });
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Cupón a salvo',
          icon: 'error',
          confirmButtonColor: '#fc5c04'  // Cambia el color del botón "OK" cuando se cancela
        });
      }
    });
  }

  onSubmitUpdate() {
    if (this.upadteCuponForm.valid) {
      const updateData = this.upadteCuponForm.value;
      this.cuponService.updateCupon(this.id_cupon, updateData).subscribe(
        response => {
          this.toastrService.success(response.message, 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.modalRef.close();
          this.listarCupones();
        },
        error => {
          this.toastrService.error(error.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

}
