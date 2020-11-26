import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }
  loguear ={
    correo:'',
    pass:'',
  }

  ngOnInit(): void {
  }
  //El observable que se genera desde el authservice repuesta de comunicacion front a back con el 
  //subscribe es leer la respuesta del observable  Es un REQ que se envia desde angular o POSTMAN a Backend
  login(){
    // en el res viene un jasonwebtoken es la respuesta de backend a Angular
    this.auth.loginUsuario(this.loguear).subscribe((res) =>{
      console.log(res);
      // apenas hago el login guardo res.jwtToken(info encriptada) en un localStorage
      localStorage.setItem('token',res.jwtToken);
      // cuando usuario se encuentra logueado con token lo lleva a la pagina ruta listarActividad
      this.router.navigate(['/listarActividad']);

    },
    (err) => console.log(err)

    );
  }

}
