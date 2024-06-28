import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeccionDto } from 'src/app/models/seccion/seccion.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  seccionUrl = environment.seccionUrl

  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR SECCIONES
  public listaSeccion(): Observable<SeccionDto[]>{
    return this.httpClient.get<SeccionDto[]>(this.seccionUrl)
  }
}
