import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDto } from 'src/app/models/token.dto';
import { LoginUsuarioDto } from 'src/app/models/usuario/login-usuario.dto';
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

}
