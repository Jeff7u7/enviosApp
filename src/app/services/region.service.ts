import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Region } from '../models/region';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private urlEndPoint: string = 'http://localhost:8090/api/regiones';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  headers: HttpHeaders = new HttpHeaders();
  
  protected agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', `Bearer ${token}`);
    }
    return this.httpHeaders;
  }

  listar(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint);
  }

  ver(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.urlEndPoint}/${id}`);
  }

  crear(Region: Region): Observable<Region> {
    return this.http.post<Region>(`${this.urlEndPoint}`, Region, { headers: this.agregarAuthorizationHeader() });
  }

  modificar(Region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.urlEndPoint}/${Region.id}`, Region, { headers: this.agregarAuthorizationHeader() });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() });
  }
}
