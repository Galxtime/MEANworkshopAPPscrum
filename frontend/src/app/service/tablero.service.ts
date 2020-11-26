import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableroService {
  constructor(private http: HttpClient) { }

  // api que nos permite crear y listar actividades
  private listaUrl='http://localhost:3000/api/tablero/lista';
  private crearUrl= 'http://localhost:3000/api/tablero';
  private imgUrl= 'http://localhost:3000/api/tablero/cargarArchivo';

  listaActividad(){
    return this.http.get<any>(this.listaUrl);
  }
  crearActividad(tablero){
    //necesita tablero para guardar
    return this.http.post<any>(this.crearUrl, tablero);
  }
// consumir el servicio desde el backend put actualizar con el mismo id
  editarActividad(tablero) {
    return this.http.put<any>(this.crearUrl, tablero);
  }
// extraer el _id de la actividad ,  en la const url guarda un observable, los backtips permiten cambiar campos${}
  eliminarActividad(tablero) {
    const _id = tablero._id;
    const url = `${this.crearUrl}/${_id}`;
    return this.http.delete<any>(url);
  }

  // crear metodo subir imagen
  crearActividadImg(tablero){
    return this.http.post<any>(this.imgUrl, tablero);
  }
}
