import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDto } from 'src/app/models/categoria/categoria.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = environment.categoriaUrl

  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR SECCIONES
  public listaCategorias(): Observable<CategoriaDto[]>{
    return this.httpClient.get<CategoriaDto[]>(this.categoriaUrl)
  }
}
