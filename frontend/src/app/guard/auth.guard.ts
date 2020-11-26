import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
//importar nuestro servicio si usuario esta logeado o no
import {AuthService} from '../service/auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) { }


  canActivate():boolean {
    if (this.auth.loginOn()){
      return true;
    }else {
        this.router.navigate(['login']);
      return false;
    }
  
    
  }
  
}
