import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolDto } from 'src/app/models/rol/rol.dto';
import { RolService } from 'src/app/shared/service/usuarios/rol.service';
import { UsuariosService } from 'src/app/shared/service/usuarios/usuarios.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public active = 1;

  //DTO del Rol
  rolDto: RolDto[]

  @ViewChild('fileInput') fileInput: ElementRef;


  userForm: FormGroup;
  selectedFile: File = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private toastrService: ToastrService,
    private rolServices: RolService,
    private router: Router

  ) {
    this.userForm = this.fb.group({
      usu_identifiacion: [''],
      usu_nombre: [''],
      usu_apellido: [''],
      usu_email: [''],
      usu_nombreUsuario: [''],
      usu_password: [''],
      rolId: ['']
    });
  }

  //Inicializar Metodos
  ngOnInit() {
    this.getAllRoles();
  }


  //Cargar Imagen Usuario
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  createUserForm(): void {
    this.userForm = this.fb.group({
      usu_identifiacion: ['', Validators.required],
      usu_nombre: ['', Validators.required],
      usu_apellido: ['', Validators.required],
      usu_email: ['', [Validators.required, Validators.email]],
      usu_nombreUsuario: ['', Validators.required],
      usu_password: ['', Validators.required],
      rolId: ['', Validators.required]
    });
  }

  //REGISTRAR USUARIO CON FORMS
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar mensajes de error
      return;
    }

    const formData = new FormData();
    formData.append('usu_identifiacion', this.userForm.get('usu_identifiacion').value);
    formData.append('usu_nombre', this.userForm.get('usu_nombre').value);
    formData.append('usu_apellido', this.userForm.get('usu_apellido').value);
    formData.append('usu_email', this.userForm.get('usu_email').value);
    formData.append('usu_nombreUsuario', this.userForm.get('usu_nombreUsuario').value);
    formData.append('usu_password', this.userForm.get('usu_password').value);
    formData.append('rolId', this.userForm.get('rolId').value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    } else {
      console.warn('Imagen no seleccionada');
    }

    this.usuarioService.createUser(formData).subscribe(
      (data) => {
        this.toastrService.success(data.message, 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.userForm.reset(); // Limpiar el formulario después del envío exitoso
        this.selectedFile = null; // Resetear la imagen seleccionada
        this.fileInput.nativeElement.value = ''; // Resetear el campo de entrada de archivo
        this.router.navigate(['/users/list-user'])
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
        const errorMessage = error.error?.message || 'Error al crear el usuario';
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }



  isFieldInvalid(field: string): boolean {
    return this.userForm.get(field).invalid && (this.userForm.get(field).touched || this.userForm.get(field).dirty);
  }

  //Obtener los roles
  getAllRoles(): void {
    this.rolServices.getAllRoles().subscribe(
      data => {
        this.rolDto = data
      },
      err => {
        err.error.message
      }
    )
  }


}
