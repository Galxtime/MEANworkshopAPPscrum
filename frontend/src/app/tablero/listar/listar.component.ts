import { Component, OnInit } from '@angular/core';
import { TableroService} from '../../service/tablero.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  constructor(private tablero:TableroService) { }
   lista=[];

  ngOnInit(): void {
    this.tablero.listaActividad().subscribe(
      (res) => {
        this.lista= res;
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  cambiarEstado(listaElegida, estado) {
    // la actividad que tenemos le sacamos el estado inicial lo guardamos en la variable estadoTemp
    const estadoTemp=listaElegida.estado
    //le cambio estado
    listaElegida.estado=estado;
    // lo invoko  edita en el backend en lista Eligida tiene el estado que quiere cambiar, SUBSCRIBE trae una
    // respuesta desde tableroservice.ts editarActividad put de router tablero hace una respuesta se devuelve a listar
    // la leemos con res le ponemos el estado y lo cambiamos en la pagina
    this.tablero.editarActividad(listaElegida).subscribe(
      (res)=> {
        // se edita para el front para que nos muestre en el front
        listaElegida.estado=estado;

      }, 
      (err)=> {
        // si sucede un error lo mantengo igual el estado
        console.log(err)
        listaElegida.estado= estadoTemp;
      }
    )
  }

eliminar(eliminarLista) {

  this.tablero.eliminarActividad(eliminarLista).subscribe(
    (res)=>{
      //la lista de actividades se cargo en la variable lista=[] tengo que encontrar la posicion 
      // indexof devuelvame el indice de eliminarLista
      const index=this.lista.indexOf(eliminarLista);
      //si index es positivo lo encontro si es negativo n
        if(index > -1){
          // la lista con splice tengo un index en la posicion 4 elimine un elemento
          this.lista.splice(index , 1);
        }
    },
    (err)=>{
      console.log(err);

    }
  );
}

}
