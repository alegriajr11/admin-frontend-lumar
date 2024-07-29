import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdaterUsuarioDto } from 'src/app/models/usuario/usuario-update.dto';
import { UsuarioDto } from 'src/app/models/usuario/usuario.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarioURL = environment.usuarioURL;


  constructor(private httpClient: HttpClient) {}

  //Petición crear usuario
  createUser(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.usuarioURL, formData);
  }

  //Peticion listar todos los usarios
  getAllUsers(): Observable<UsuarioDto[]>{
    return this.httpClient.get<UsuarioDto[]>(this.usuarioURL)
  }

  //PETICION OBTENER UN USUARIO
  getOneUser(usu_id: number): Observable<UsuarioDto>{
    return this.httpClient.get<UsuarioDto>(this.usuarioURL + usu_id)
  }

  //PETICION ACTUALIZAR USUARIO
  updateUser(usu_id: number, usuario: UpdaterUsuarioDto): Observable<any>{
    return this.httpClient.put<any>(this.usuarioURL + usu_id, usuario)
  }

}
