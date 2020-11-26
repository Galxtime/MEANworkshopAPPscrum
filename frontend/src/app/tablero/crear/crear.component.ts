import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {TableroService} from '../../service/tablero.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private tablero: TableroService) {}
// almacenamos lo que digite el usuario
  crearActividad = {
    nombre: '',
    estado: '',
    descripcion: '',
  };

  //Creamos una variable tipo archivo donde queda guardado el archivo
  elegirImg: File= null;

// metodo  permite Angular cargar el archivo
 subirArchivo(event){
   this.elegirImg = <File>event.target.files[0];
 }
  
  crearImg(){
    const miFile = new FormData();
    miFile.append('nombre', this.crearActividad.nombre);
    miFile.append('estado', this.crearActividad.estado);
    miFile.append('sticker', this.elegirImg, this.elegirImg.name);
    miFile.append('descripcion', this.crearActividad.descripcion);
    this.tablero.crearActividadImg(miFile).subscribe(
      (res)=> {
        this.router.navigate(['/listarActividad']);

      },
      (err)=> {

      }

    )

  }

  ngOnInit(): void {}
// funcion de boton crear actividad
  crear() {
    this.tablero.crearActividad(this.crearActividad).subscribe(
      (res)=> {
        console.log(res);
        // apneas se crea actividad me lleva a la lista de Actividades
        this.router.navigate(['/listarActividad'])
      },
      (err)=> {
        console.log(err);
      }
    );
  }

}
