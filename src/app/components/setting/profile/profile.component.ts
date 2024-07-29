import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDto } from 'src/app/models/usuario/change-password.dto';
import { UsuarioEmailDto } from 'src/app/models/usuario/usuario-email.dto';
import { UsuarioDto } from 'src/app/models/usuario/usuario.dto';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { UsuariosService } from 'src/app/shared/service/usuarios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public closeResult: string;

  modalRef: NgbModalRef;

  public active = 1;

  //RUTA SOLICUTD IMG
  usuarioIMG_URL = environment.usuarioIMG_URL

  usu_id: number
  //DTO USUARIO
  usuarioDto: UsuarioDto
  usuario_passwordDto: ChangePasswordDto = null
  usuario_emailDto: UsuarioEmailDto = null
  //LISTA VACIA
  listaVacia: any = undefined

  resetPasswordForm: FormGroup;
  upadteUserForm: FormGroup;
  codeSent: boolean = false;

  updateEmail: boolean = false;

  email: string
  nombre_usuario: string

  codigo_usuario: string
  new_password_usuario: string

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private usuarioService: UsuariosService,
    private toastrService: ToastrService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,

  ) {
    this.passwordForm();
    this.usuarioUpdateForm();
  }

  ngOnInit() {
    this.getIdUser();
    this.getOneUser();
  }

  //CONSTRUTCTOR RESET PASSWORD
  passwordForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      resetPasswordCode: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    });
  }

  //CONSTRUTCTOR UPDATE USUARIO
  usuarioUpdateForm() {
    this.upadteUserForm = this.fb.group({
      usu_email: ['', [Validators.required, Validators.email]],
      usu_nombreUsuario: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (!this.codeSent) {
      this.sendResetCode();
    } else {
      this.resetPassword();
    }
  }

  onSubmitUpdate() {
    if (this.upadteUserForm.valid) {
      const updateData = this.upadteUserForm.value;
      this.usuarioService.updateUser(this.usu_id, updateData).subscribe(
        response => {
          this.toastrService.success(response.message, 'Éxito', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
          this.modalRef.close();
          this.getOneUser();
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

  //VERIFICAR QUE DATOS QUIERE ACTUALIZAR, EMAIL O NOMBRE USUARIO
  datosUpdate(dato: boolean) {
    if (!dato) {
      this.updateEmail = false
    } else {
      this.updateEmail = true
    }
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


  //OBTENER UN USUARIO
  getOneUser(): void {
    this.usuarioService.getOneUser(this.usu_id).subscribe(
      data => {
        this.usuarioDto = data
        this.email = this.usuarioDto.usu_email
        this.nombre_usuario = this.usuarioDto.usu_nombreUsuario
        //ASIGNANDO EL EMAIL AL INPUT DEL MODAL REESTABLECER CONTRASEÑA
        this.setEmailValue(this.email);
        //ASIGNANDO USUARIO Y EMAIL PARA FORMULARIO UPDATE
        this.setNameEmailValue(this.email, this.nombre_usuario)
      },
      err => {
        this.listaVacia = err.error.message
      }
    )
  }

  //OBTENER EL EMAIL EN EL INPUT
  setEmailValue(email: string): void {
    this.resetPasswordForm.patchValue({
      usu_email: email
    });
  }

  //OBTENER EL NOMBRE DE USUARIO Y EL EMAIL EN EL INPUT
  setNameEmailValue(email: string, name_user: string): void {
    this.upadteUserForm.patchValue({
      usu_email: email,
      usu_nombreUsuario: name_user
    });
  }

  getIdUser(): void {
    this.usu_id = this.tokenService.getUserId();
  }

  //OBTENER LA IMAGEN DEL USUARIO
  getUserImageUrl(imageName: string): string {
    return this.usuarioIMG_URL + imageName; // Construye la URL completa de la imagen
  }

  //Validar un email valido y enviar codigo
  sendResetCode(): void {
    this.email = this.resetPasswordForm.get('email')?.value;

    if (!this.email) {
      this.toastrService.error('Por favor, ingrese un correo electrónico válido.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      console.log(this.resetPasswordForm.value)
      return;
    }

    this.usuario_emailDto = new UsuarioEmailDto(this.email);

    this.authService.requestPassword(this.usuario_emailDto).subscribe(
      data => {
        this.codeSent = true;
        this.toastrService.success('Se envió un código a tu correo electrónico', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
      err => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  //CAMBIAR CONTRASEÑA - ENVIANDO CODIGO AL CORREO
  resetPassword(): void {
    this.codigo_usuario = this.resetPasswordForm.get('resetPasswordCode')?.value
    this.new_password_usuario = this.resetPasswordForm.get('newPassword')?.value

    this.usuario_passwordDto = new ChangePasswordDto(this.codigo_usuario, this.new_password_usuario)

    if (!this.codigo_usuario || !this.new_password_usuario) {
      this.toastrService.error('Por favor, ingresa todos los datos.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }

    this.authService.changePassword(this.usuario_passwordDto).subscribe(
      data => {
        this.toastrService.success('Contraseña cambiada exitosamente', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.logOut();
        this.modalRef.close();
      },
      error => {
        const errorMessage = error.error?.message;
        this.toastrService.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  //CERRAR SESIÓN
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
