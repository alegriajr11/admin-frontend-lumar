import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcategoriaDto } from 'src/app/models/subcategoria/subcategoria.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  subcategoriaUrl = environment.subcategoriaUrl

  constructor(private httpClient: HttpClient) { }

  //SOLICITUD LISTAR SECCIONES
  public listaSubcategoria(): Observable<SubcategoriaDto[]>{
    return this.httpClient.get<SubcategoriaDto[]>(this.subcategoriaUrl)
  }
  
  //SOLICITUD LISTAR SUBCATEGORIAS POR ID DE CATEGORIA
  public listaSubcategoriaByCategoria(cat_id: number): Observable<SubcategoriaDto[]>{
    return this.httpClient.get<SubcategoriaDto[]>(this.subcategoriaUrl + 'categoria/' + cat_id)
  }
}
