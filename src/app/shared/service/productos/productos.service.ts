import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productoUrl = environment.productoURL

  constructor(private httpClient: HttpClient) { }

  public createProducto(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.productoUrl}`, formData);
  }

  //Obtener todos los productos
  public getAllProductos(): Observable<any> {
    return this.httpClient.get<any>(this.productoUrl);
  }

  //Solicitud eliminar Producto
  public eliminarProducto(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.productoUrl}${id}`);
  }

}
