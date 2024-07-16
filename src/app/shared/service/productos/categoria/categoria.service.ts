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

  //SOLICITUD LISTAR CATEGORIAS
  public listaCategorias(): Observable<CategoriaDto[]> {
    return this.httpClient.get<CategoriaDto[]>(this.categoriaUrl)
  }

  //SOLICITUD CREAR CATEGORIA
  public createCategoria(categoriaDto: CategoriaDto): Observable<any> {
    return this.httpClient.post<any>(`${this.categoriaUrl}`, categoriaDto)
  }

  //SOLICITUD ELIMINAR CATEGORIA
  public eliminarCategoria(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.categoriaUrl}${id}`);
  }

  //SOLICITUD LISTAR CATEGORIAS POR SECCION
  public listaCategoriasBySeccion(secc_id: number): Observable<CategoriaDto[]> {
    return this.httpClient.get<CategoriaDto[]>(this.categoriaUrl + `seccion/${secc_id}`)
  }

}
