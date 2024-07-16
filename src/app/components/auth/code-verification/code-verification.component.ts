import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenService } from 'src/app/shared/service/token.service';
import { Router } from '@angular/router';
import { UsuarioEmailDto } from 'src/app/models/usuario/usuario-email.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordDto } from 'src/app/models/usuario/change-password.dto';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.scss'
})
export class CodeVerificationComponent {

  resetPasswordForm: FormGroup;
  codeSent: boolean = false;

  email: string

  tittle: string = 'Artesanias Lumar'
  info_pass: string = 'Ingresa tu correo electrónico para solicitar cambio de contraseña'

  usuario_passwordDto: ChangePasswordDto = null
  usuario_emailDto: UsuarioEmailDto = null

  codigo_usuario: string
  new_password_usuario: string

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      resetPasswordCode: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    if (!this.codeSent) {
      this.sendResetCode();
    } else {
      this.resetPassword();
    }
  }

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
        this.info_pass = 'Verifica el código enviado al correo electrónico para cambiar la contraseña, el código expira en 10 minutos';
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

  resetPassword(): void {
    this.codigo_usuario =  this.resetPasswordForm.get('resetPasswordCode')?.value
    this.new_password_usuario = this.resetPasswordForm.get('newPassword')?.value

    this.usuario_passwordDto = new ChangePasswordDto(this.codigo_usuario, this.new_password_usuario)

    if(!this.codigo_usuario || !this.new_password_usuario){
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
        this.router.navigate(['/login']);
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
}
