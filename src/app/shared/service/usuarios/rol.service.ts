import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolDto } from 'src/app/models/rol/rol.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rolURL = environment.rol_URL;


  constructor(private httpClient: HttpClient) { }

  //Peticion listar todos los roles
  getAllRoles(): Observable<RolDto[]> {
    return this.httpClient.get<RolDto[]>(this.rolURL)
  }
}
