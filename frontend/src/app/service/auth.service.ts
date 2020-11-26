import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registroUrl='http://localhost:3000/api/usuario/';
  private loginUrl= 'http://localhost:3000/api/auth/';

//constructor lo primero que se ejecuta antes de lo que construye toda la class
  constructor(private http: HttpClient,private router :Router) { }

  registroUsuario(usuario){
    return this.http.post<any>(this.registroUrl, usuario);
  }

  loginUsuario(usuario){
    return this.http.post<any>(this.loginUrl, usuario);
  }
  // metodo identificar que el usuario se registro (backend devuelve un jwt) token es lo que se guardo de res.jwtToken
  loginOn(){
    //valido si tiene un token con true  si es null es false  con !! extension de la negación devuelvo un true o false
     return !!localStorage.getItem('token');
  }
  //obtenerToken Authorizacion es lo primero que se cargan null al intentar  
  obtenerToken(){
    return localStorage.getItem('token');
  }
// metodo va a borrar token y a direccionar a login
  cerrarSesion(){
    // vamos a eliminar jwt
    localStorage.removeItem('token');
    // apenas cerrar sesión llevar a login  vamos a crear actividad listarActividad
    this.router.navigate(['/login']);
  }
}
