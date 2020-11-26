import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
// importamos service y router necesitamos instanciar y que se cargen en el constructor antes de ejecutar class

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
//declaramos las variables de los import Authservice Router
  constructor(private auth:AuthService, private router:Router) { }
// necesitamos captura desde HTML y  lo guardamos en este JSON que venga de registro component
     registrarUsuario= {
      nombre: '',
      cedula: '',
      edad:   '',
      correo: '',
      pass:   ''

     }
  ngOnInit(): void {
  }
  // Boton cuando usuario envie datos llama al service el metodo registro Usuario con el JSON devuelve un observable
  //para ver la info del observable con subscribe
  registrar(){
    this.auth.registroUsuario(this.registrarUsuario).subscribe((res) =>{
      console.log(res);
      this.router.navigate(['./login']);
    },
    (err) => console.log(err)

    );
  }

}
