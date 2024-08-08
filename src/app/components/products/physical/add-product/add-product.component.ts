import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaDto } from 'src/app/models/categoria/categoria.dto';
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { SubcategoriaDto } from 'src/app/models/subcategoria/subcategoria.dto';
import { CategoriaService } from 'src/app/shared/service/productos/categoria/categoria.service';
import { ProductosService } from 'src/app/shared/service/productos/productos.service';
import { SeccionService } from 'src/app/shared/service/productos/seccion/seccion.service';
import { SubcategoriaService } from 'src/app/shared/service/productos/subcategoria/subcategoria.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  productoForm: FormGroup;
  files: File[] = [];

  currentStep: number = 1;
  fotos: string[] = [];
  archivos: File[] = [];

  //Nombre de la seccion seleccionada
  selectedSeccionNombre = '';
  //Nombre de la subcategoria seleccionada
  selectedSubNombre: string;

  activate_talla: boolean = false

  //DTO PARA SECCION
  seccionDto: SeccionDto[];
  categoriaDto: CategoriaDto[]
  subcategoriaDto: SubcategoriaDto[]


  nombre_categoria: string

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private productoService: ProductosService,
    private seccionService: SeccionService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    //Listar Secciones
    this.listarSecciones();
  }

  createForm() {
    this.productoForm = this.fb.group({
      prod_nombre: ['', Validators.required],
      prod_descripcion: [''],
      prod_precio: ['', [Validators.required, Validators.min(0)]],
      prod_precio_oferta: ['', [Validators.required, Validators.min(0)]],
      sub_id: ['', Validators.required],
      seccion: ['', Validators.required],
      categoria: ['', Validators.required],
      inventarios: this.fb.array([
        this.fb.group({
          inv_cantidad_disponible: [1, [Validators.required, Validators.min(1)]],
          inv_talla: ['']
        })
      ])
    });
  }


  get inventarios() {
    return this.productoForm.get('inventarios') as FormArray;
  }

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  //Verificar si la seccion escogida es ropa para habilitar la talla
  habilitarTalla() {
    const selectedIndex = this.productoForm.get('seccion').value;
    const seccion = this.seccionDto[selectedIndex - 1];
    this.selectedSeccionNombre = seccion ? seccion.secc_nombre : 'No seleccionada';
    if (this.selectedSeccionNombre === "Ropa" || this.selectedSeccionNombre === "ropa") {
      //Activar el input de talla
      this.activate_talla = true
    }
    else {
      this.activate_talla = false
    }
  }

  //Valor del inventario siempre mayor o igual 1

  // Cargar las imágenes
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // Añadir nuevas imágenes a las ya existentes
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            // Añadir la nueva imagen a la lista de imágenes
            this.fotos.push(e.target.result);
          };
          reader.readAsDataURL(file);
          // Añadir el archivo a la lista de archivos
          this.archivos.push(file);
        }
      }
    }
  }

  //Remover la foto cargada
  removeFoto(index: number) {
    this.fotos.splice(index, 1);
    this.archivos.splice(index, 1);
  }

  addInventario() {
    const newInventario = this.fb.group({
      id: [Date.now()], // Agrega un identificador único para cada nuevo inventario
      inv_cantidad_disponible: [null, [Validators.required, Validators.min(1)]],
      inv_talla: [''],
      inv_color: ['']
    });

    this.inventarios.push(newInventario);
  }

  removeInventario(index: number) {
    const inventario = this.inventarios.at(index).value;

    // Solo eliminar si el inventario tiene un identificador que indica que es dinámico
    if (inventario.id) {
      this.inventarios.removeAt(index);
    } else {
      // Opcional: muestra un mensaje indicando que no se puede eliminar un inventario preexistente
      alert('No se puede eliminar un inventario preexistente.');
    }
  }



  //Asignar los selects vacios al seleccionar una seccion
  clearSelects() {
    this.productoForm.get('categoria').setValue("");
    this.productoForm.get('sub_id').setValue("");
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

  //Peticion cargar subcategorias por categoria id
  async onCategoriaChangeSubCategoria() {
    const categoriaId = this.productoForm.get('categoria').value;

    const categoriaSelect = document.getElementById('categoriaSelect') as HTMLSelectElement;
    // Obtén el texto de la opción seleccionada
    const selectedOption = categoriaSelect.options[categoriaSelect.selectedIndex];
    const nombreCategoriaSeleccionada = selectedOption ? selectedOption.text : undefined;

    //Asignar el nombre de la categoria seleccionada a la variable
    this.nombre_categoria =  nombreCategoriaSeleccionada

    this.subcategoriaService.listaSubcategoriaByCategoria(categoriaId).subscribe(
      data => {
        this.subcategoriaDto = data
      },
      err => {
        err.error.message
      }
    )
  }

  //Petición Agregar Producto
  onSubmit() {
    if (this.productoForm.invalid) {
      this.toastrService.error('Por favor, complete todos los campos requeridos.');
      return;
    }

    // Verificar si se han agregado imágenes
    if (this.archivos.length === 0) {
      this.toastrService.error('Debe agregar al menos una imagen.');
      return;
    }

    const formData = new FormData();

    // Agregar campos del formulario
    formData.append('prod_nombre', this.productoForm.get('prod_nombre').value);
    formData.append('prod_descripcion', this.productoForm.get('prod_descripcion').value || '');
    formData.append('prod_precio', this.productoForm.get('prod_precio').value);
    formData.append('prod_precio_oferta', this.productoForm.get('prod_precio_oferta').value);
    formData.append('sub_id', this.productoForm.get('sub_id').value);
    formData.append('categoria', this.nombre_categoria);


    // Agregar inventarios
    const inventariosArray = this.productoForm.get('inventarios')?.value;
    inventariosArray.forEach((inventario: any, index: number) => {
      formData.append(`inventarios[${index}].inv_cantidad_disponible`, inventario.inv_cantidad_disponible);
      formData.append(`inventarios[${index}].inv_talla`, inventario.inv_talla || '');
    });


    // Agregar archivos
    this.archivos.forEach(file => {
      formData.append('images', file, file.name);
    });

    this.productoService.createProducto(formData).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        // Reiniciar los inputs
        this.productoForm.reset();
        this.fotos = [];
        this.archivos = [];
        this.router.navigate(['/productos/producto-lista'])
      },
      (error) => {
        const errorMessage = error.error?.message || 'Error al crear el producto';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        console.error(error);
      }
    );
  }
}
