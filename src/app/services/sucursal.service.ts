import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sucursal } from '../models/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private urlEndPoint: string = 'http://localhost:8090/api/sucursales';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  listar(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.urlEndPoint);
  }

  ver(id: number): Observable<Sucursal> {
    return this.http.get<Sucursal>(`${this.urlEndPoint}/$id`);
  }

  crear(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(this.urlEndPoint, sucursal, { headers: this.httpHeaders });
  }

  modificar(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this.urlEndPoint}/${sucursal.id}`, sucursal, { headers: this.httpHeaders });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}
