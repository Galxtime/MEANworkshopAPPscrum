import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CrearComponent } from './tablero/crear/crear.component';
import { ListarComponent } from './tablero/listar/listar.component';
import {AuthGuard} from './guard/auth.guard';


const routes: Routes = [
  {
    //una ruta de navegación 'vacio ' lo primero que carga muestra el componente login
    path:'',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'listarActividad',
    component:ListarComponent,
    canActivate: [AuthGuard],
   },
   {
     path:'crearActividad',
     component:CrearComponent,
     canActivate: [AuthGuard],

   },
   {
     path:'login',
     component:LoginComponent,

   },
   {
     path:'registro',
     component:RegistroComponent,
   }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
