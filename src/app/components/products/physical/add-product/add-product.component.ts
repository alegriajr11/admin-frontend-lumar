import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaDto } from 'src/app/models/categoria/categoria.dto';
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { CategoriaService } from 'src/app/shared/service/productos/categoria/categoria.service';
import { SeccionService } from 'src/app/shared/service/productos/seccion/seccion.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  productoForm: FormGroup;
  currentStep: number = 1;
  fotos: string[] = [];
  tallas: FormArray;
  variantes: FormArray;
  isRopaOrZapatos: boolean = false;

  //DTO PARA SECCION
  seccionDto: SeccionDto[];
  categoriaDto: CategoriaDto[]

  constructor(
    private fb: FormBuilder, 
    private toastrService: ToastrService,
    private seccionService: SeccionService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      seccion: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
      tallas: this.fb.array([]),
      variantes: this.fb.array([]),
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      color: ['', [Validators.required]],
    });

    this.tallas = this.productoForm.get('tallas') as FormArray;
    this.variantes = this.productoForm.get('variantes') as FormArray;

    //Listar Secciones
    this.listarSecciones();
  }



  onSectionChange() {
    const seccion = this.productoForm.get('seccion').value;
    this.isRopaOrZapatos = (seccion === 3 );
    if (!this.isRopaOrZapatos) {
      this.tallas.clear();
    }
  }

  //Asignar el color del componente color-picker
  onColorSelected(color) {
    this.productoForm.controls['color'].setValue(color.name);
  }

  goToNextStep() {
    if (this.currentStep === 1) {
      const seccion = this.productoForm.get('seccion').value;
      const categoria = this.productoForm.get('categoria').value;
      const subcategoria = this.productoForm.get('subcategoria').value;

      if (!seccion || !categoria || !subcategoria) {
        this.toastrService.error('Por favor, selecciona todos los campos.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        return;
      }

      console.log(seccion)

      // Lógica para decidir si pasar al paso 2 o 3
      if (seccion == 3) { //seccion con valor de 3 en la Base de datos es Ropa
        this.isRopaOrZapatos = true
        this.currentStep++;
      } else {
        // Si no es ropa ni zapatos, ir directamente al paso 3
        this.currentStep = 3;
      }
    } else if (this.currentStep === 2) {
      if (!this.isRopaOrZapatos && this.tallas.length === 0) {
        this.toastrService.error('Por favor, agrega al menos una talla.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        return;
      }
      this.currentStep++;
    }
    console.log(this.isRopaOrZapatos)
  }

  goToPreviousStep() {
    if (this.currentStep === 2) {
      this.currentStep--;
    } else if (this.currentStep === 3) {
      const seccion = this.productoForm.get('seccion').value;

      if (seccion == 3) {
        this.currentStep--;
      } else {
        this.currentStep = 1;
      }
    }
  }

  addTalla() {
    this.tallas.push(this.fb.group({
      talla: ['', Validators.required]
    }));
  }

  removeTalla(index: number) {
    this.tallas.removeAt(index);
  }

  addVariante() {
    this.variantes.push(this.fb.group({
      talla: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
    }));
  }

  removeVariante(index: number) {
    this.variantes.removeAt(index);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotos.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeFoto(index: number) {
    this.fotos.splice(index, 1);
  }

  //Peticion listar secciones
  listarSecciones(): void {
    this.seccionService.listaSeccion().subscribe(
      data => {
        this.seccionDto = data

      },
      err => {
        err.error.message
      }
    )
  }

  //Peticion cargar categorias por seccion id
  onSectionChangeCategoria() {
    const seccionId = this.productoForm.get('seccion').value;
    this.categoriaService.listaCategoriasBySeccion(seccionId).subscribe(
      data => {
        this.categoriaDto = data
      },
      err => {
        err.error.message
      }
    )
  }

  onSubmit() {
    if (this.productoForm.valid) {
      this.toastrService.success('Formulario válido.', 'Ok')
      console.log('Formulario válido:', this.productoForm.value);
    } else {
      this.toastrService.error('Formulario inválido.', 'Error')
      console.log('Formulario inválido');
      console.log(this.productoForm.value)
    }
  }
}
