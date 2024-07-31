import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CategoriaDto } from "src/app/models/categoria/categoria.dto";
import { CuponDto } from "src/app/models/cupon/cupon.dto";
import { SeccionDto } from "src/app/models/seccion/seccion.dto";
import { TipoDescuentoDto } from "src/app/models/tipo_descuento/tipo_descuento.dto";
import { CuponService } from "src/app/shared/service/cupon/cupon.service";
import { CategoriaService } from "src/app/shared/service/productos/categoria/categoria.service";
import { SeccionService } from "src/app/shared/service/productos/seccion/seccion.service";

@Component({
  selector: "app-create-coupon",
  templateUrl: "./create-coupon.component.html",
  styleUrls: ["./create-coupon.component.scss"],
})
export class CreateCouponComponent implements OnInit {
  public active = 1;

  cuponForm: FormGroup;
  selectedFile: File = null;

  //Variables controlar la fecha limite
  cup_fecha_inicial: string;
  habilitarFechaFin: boolean = false;
  //LISTA VACIA
  listaVacia: any = undefined

  //Variable informacion para el ingreso de cantidad de descuento
  info_cantidad: string

  //DTOS
  tipo_descuentoDto: TipoDescuentoDto[];
  seccionDto: SeccionDto[];
  categoriaDto: CategoriaDto[]
  newCuponDto: CuponDto = null

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private cuponService: CuponService,
    private seccionService: SeccionService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.cuponForm = this.fb.group({
      cup_titulo: [""],
      cup_codigo: [""],
      cup_descripcion: [""],
      cup_fecha_inicio: [""],
      cup_fecha_final: [""],
      cup_cantidad_descuento: [""],
      seccion: [""],
      tipoDescuentoTipId: [""],
      categoriaCatId: [""],
    });
  }

  //Inicializar Metodos
  ngOnInit() {
    this.createCuponForm();
    this.getTiposDescuento();
    this.listarSecciones();
    //Deshabilitar input fecha final
    this.cuponForm.get("cup_fecha_final").disable();
    //Deshabilitar select categoria
    this.cuponForm.get("categoriaCatId").disable();
  }

  createCuponForm(): void {
    this.cuponForm = this.fb.group({
      cup_titulo: ["", Validators.required],
      cup_codigo: ["", Validators.required],
      cup_descripcion: [""],
      cup_fecha_inicio: ["", [Validators.required]],
      cup_fecha_final: ["", Validators.required],
      cup_cantidad_descuento: ["", Validators.required],
      seccion: ["", Validators.required],
      tipoDescuentoTipId: ["", Validators.required],
      categoriaCatId: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.cuponForm.invalid) {
      this.cuponForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar mensajes de error
      console.log("Formulario inválido:", this.cuponForm.errors);
      return;
    }

    const formData = this.cuponForm.value;

    this.cuponService.createCupon(formData).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.cuponForm.reset();
        this.router.navigate(['/coupons/list-coupons'])
      },
      (error) => {
        console.error('Error al crear el cupón:', error);
        const errorMessage = error.error?.message || 'Error al crear el cupón';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    )
    console.log(this.cuponForm.value); // Mostrar el valor del formulario en la consola
  }

  fechaMinimaFinal() {
    // Obtener el valor de cup_fecha_inicio
    const fechaInicio = this.cuponForm.get("cup_fecha_inicio").value;
    //Asignar el valor a la variable de control
    this.cup_fecha_inicial = fechaInicio;
    //habilitar input fecha final
    this.cuponForm.get("cup_fecha_final").enable();
  }

  //Listar los tipos de descuento
  getTiposDescuento(): void {
    this.cuponService.getTipoDescuento().subscribe(
      data => {
        this.tipo_descuentoDto = data
      },
      err => {
        err.error.message
      }
    )
  }
  //Validar que se escogio en el tipo descuento
  selectedTipoDescuento(): void {
    const tipo_descuento = this.cuponForm.get('tipoDescuentoTipId').value
    if (tipo_descuento == 1) {
      this.info_cantidad = "Ingresa un porcentaje de descuento: "
    } else {
      this.info_cantidad = "Ingresa un precio fijo para el descuento: "
    }
  }

  //Listar secciones
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



  //Peticion cargar categorias por seccion id
  onSectionChangeCategoria() {
    const seccionId = this.cuponForm.get('seccion').value;
    this.cuponForm.get("categoriaCatId").enable();
    this.categoriaService.listaCategoriasBySeccion(seccionId).subscribe(
      data => {
        this.categoriaDto = data
      },
      err => {
        err.error.message
      }
    )
  }
}
