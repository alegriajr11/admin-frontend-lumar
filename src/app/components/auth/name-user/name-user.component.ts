import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioEmailDto } from 'src/app/models/usuario/usuario-email.dto';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-name-user',
  templateUrl: './name-user.component.html',
  styleUrl: './name-user.component.scss'
})
export class NameUserComponent {

  userNameForm: FormGroup;

  tittle: string = 'Artesanias Lumar'
  info_pass: string = 'Ingresa tu correo electrónico para solicitar tu usuario'

  email: string

  usuario_emailDto: UsuarioEmailDto = null

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.userNameForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  onSubmit(): void {
    this.sendUserName();
  }


  sendUserName(): void {
    this.email = this.userNameForm.get('email')?.value;

    if (!this.email) {
      this.toastrService.error('Por favor, ingrese un correo electrónico válido.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }


    this.usuario_emailDto = new UsuarioEmailDto(this.email);


    this.authService.sendUserName(this.usuario_emailDto).subscribe(
      data => {
        this.toastrService.success('Se envió tu nombre de usuario a tu correo electrónico', 'Éxito', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
