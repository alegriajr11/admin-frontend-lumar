import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriaDto } from 'src/app/models/categoria/categoria.dto';
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { TipoDescuentoDto } from 'src/app/models/tipo_descuento/tipo_descuento.dto';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss']
})
export class CreateCouponComponent implements OnInit {

  public active = 1;

  cuponForm: FormGroup;
  selectedFile: File = null;

  //DTOS
  tipo_descuentoDto: TipoDescuentoDto[]
  seccionDto: SeccionDto[]
  //categoriaDto: CategoriaDto[]

  categoriaDto = [
    { cat_id: 1, cat_nombre: 'Categoría 1' },
    { cat_id: 2, cat_nombre: 'Categoría 2' },
    // agrega tus categorías aquí
  ];

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.cuponForm = this.fb.group({
      cup_titulo: [''],
      cup_codigo: [''],
      cup_descripcion: [''],
      cup_fecha_inicio: [''],
      cup_fecha_final: [''],
      cup_cantidad_descuento: [''],
      seccion: [''],
      tipoDescuentoTipId: [''],
      categoriaCatId: ['']
    });
  }

  //Inicializar Metodos
  ngOnInit() {
    this.createCuponForm();
  }

  createCuponForm(): void {
    this.cuponForm = this.fb.group({
      cup_titulo: ['', Validators.required],
      cup_codigo: ['', Validators.required],
      cup_descripcion: [''],
      cup_fecha_inicio: ['', [Validators.required]],
      cup_fecha_final: ['', Validators.required],
      cup_cantidad_descuento: ['', Validators.required],
      seccion: ['', Validators.required],
      tipoDescuentoTipId: ['', Validators.required],
      categoriaCatId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cuponForm.invalid) {
      this.cuponForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar mensajes de error
      console.log("Formulario inválido:", this.cuponForm.errors);
      return;
    }

    const formData = new FormData();
    Object.keys(this.cuponForm.controls).forEach(key => {
      formData.append(key, this.cuponForm.get(key).value);
    });
    console.log('Submit Yo')
    console.log(this.cuponForm.value); // Mostrar el valor del formulario en la consola
  }
}
