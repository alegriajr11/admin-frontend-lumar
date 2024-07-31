import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateCuponDto } from 'src/app/models/cupon/cupon-update.dto';
import { CuponDto } from 'src/app/models/cupon/cupon.dto';
import { TipoDescuentoDto } from 'src/app/models/tipo_descuento/tipo_descuento.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  private tipo_descuentoURL = environment.tipo_descuento_URL
  private cupon_URL = environment.cupon_URL

  constructor(private httpClient: HttpClient) { }


  //Solicitud obtener los tipo de descuento
  getTipoDescuento(): Observable<TipoDescuentoDto[]>{
    return this.httpClient.get<TipoDescuentoDto[]>(this.tipo_descuentoURL)
  }

  //Solicitud obtener todos los cupones
  getAllCupones(): Observable<CuponDto[]>{
    return this.httpClient.get<CuponDto[]>(this.cupon_URL)
  }

  //Solicitud obtener un cupon
  getOneCupon(cuponId: number): Observable<CuponDto>{
    return this.httpClient.get<CuponDto>(this.cupon_URL + cuponId)
  }

  //Solicitud crear cupon
  createCupon(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.cupon_URL, formData);
  }

  //Solicitud Actualizar Cupon
  updateCupon(cup_id: number, cupon: UpdateCuponDto): Observable<any>{
    return this.httpClient.put<any>(this.cupon_URL + cup_id, cupon)
  }

  //Solicitud eliminar cupon
  deleteCupon(cuponId: number): Observable<any>{
    return this.httpClient.delete<any>(this.cupon_URL + cuponId)
  }
}
