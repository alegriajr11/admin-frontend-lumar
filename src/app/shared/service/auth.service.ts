import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDto } from 'src/app/models/token.dto';
import { ChangePasswordDto } from 'src/app/models/usuario/change-password.dto';
import { LoginUsuarioDto } from 'src/app/models/usuario/login-usuario.dto';
import { UsuarioEmailDto } from 'src/app/models/usuario/usuario-email.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;
  restablecerContraseña = environment.restablecerContraseña;
  //usuario = environment.usuarioURL;

  constructor(private httpClient: HttpClient) { }

  login(dto: LoginUsuarioDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'login', dto);
  }

  refresh(dto: TokenDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'refresh', dto);
  }

  //Solicitud enviar codigo de verificacion
  requestPassword(usuario: UsuarioEmailDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'sendEmail', usuario)
  }

  //Solicitud enviar nombre de usuario al email
  sendUserName(usuario: UsuarioEmailDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'sendEmailUser', usuario)
  }

  //Solicitud cambiar contraseña
  changePassword(resetPasssword: ChangePasswordDto) {
    return this.httpClient.post<any>(this.authURL + 'reset-password', resetPasssword)
  }
}
