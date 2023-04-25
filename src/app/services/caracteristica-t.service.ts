import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaracteristicaT } from '../models/caracteristicaT';


@Injectable({
  providedIn: 'root'
})
export class CaracteristicaTService {

  private urlEndPoint: string = 'http://localhost:8090/api/tarifas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  listar(): Observable<CaracteristicaT[]> {
    return this.http.get<CaracteristicaT[]>(`${this.urlEndPoint}/listar/caracteristicas`);
  }

  ver(id: number): Observable<CaracteristicaT> {
    return this.http.get<CaracteristicaT>(`${this.urlEndPoint}/caracteristica/${id}`);
  }

  crear(CaracteristicaT: CaracteristicaT): Observable<CaracteristicaT> {
    return this.http.post<CaracteristicaT>(`${this.urlEndPoint}/caracteristica`, CaracteristicaT, { headers: this.httpHeaders });
  }

  modificar(CaracteristicaT: CaracteristicaT): Observable<CaracteristicaT> {
    return this.http.put<CaracteristicaT>(`${this.urlEndPoint}/caracteristica/${CaracteristicaT.id}`, CaracteristicaT, { headers: this.httpHeaders });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/caracteristica/${id}`, { headers: this.httpHeaders });
  }
}
