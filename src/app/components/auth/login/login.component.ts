import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioDto } from 'src/app/models/usuario/login-usuario.dto';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TokenService } from 'src/app/shared/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: LoginUsuarioDto = null;



  usu_nombreUsuario: string;
  usu_password: string;



  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  title: string = "Panel Administración  Artesanias Lumar";
  desc: string = "Administre su tienda de forma eficiente y sencilla. Gestione inventarios, actualice productos y supervise ventas desde un único lugar.";



  ngOnInit() {
  }


  onLogin(): void {
    this.usuario = new LoginUsuarioDto(this.usu_nombreUsuario, this.usu_password);
    this.authService.login(this.usuario).subscribe(
      data => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Error', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        } else {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/dashboard/default']);
        }

      },
      err => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }



}
